package com.project.foodiesapi.service;

import com.project.foodiesapi.entity.FoodEntity;
import com.project.foodiesapi.io.FoodRequest;
import com.project.foodiesapi.io.FoodResponse;
import com.project.foodiesapi.io.PresignedUrlRequest;
import com.project.foodiesapi.io.PresignedUrlResponse;
import com.project.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService{
    @Autowired
    private S3Client s3Client;

    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private S3Service s3Service;

    @Value("${aws.s3.bucketname}")
    private String bucketName;
    @Value("${aws.region}")
    private String region;
    
    @Value("${aws.s3.presigned.url.expiration:3600}")
    private long presignedUrlExpirationSeconds;


    @Override
    public String uploadFile(MultipartFile file) {
        String filenameExtension = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String key = UUID.randomUUID().toString() + "." + filenameExtension;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest,
                    RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
            }
        } catch (IOException io) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while uploading the file");
        }
    }


    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
       FoodEntity newFoodEntity =  convertToEntity(request);
       String imageUrl = uploadFile(file);
       newFoodEntity.setImageUrl(imageUrl);
       newFoodEntity = foodRepository.save(newFoodEntity);

       return convertToResponse(newFoodEntity);
    }
    
    @Override
    public FoodResponse addFoodWithPresignedUrl(FoodRequest request, String imageKey) {
        FoodEntity newFoodEntity = convertToEntity(request);
        String imageUrl = s3Service.getObjectUrl(imageKey);
        newFoodEntity.setImageUrl(imageUrl);
        newFoodEntity = foodRepository.save(newFoodEntity);
        
        return convertToResponse(newFoodEntity);
    }
    
    @Override
    public PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request) {
        String filenameExtension = request.getFileName()
                .substring(request.getFileName().lastIndexOf(".") + 1);
        String key = UUID.randomUUID().toString() + "." + filenameExtension;
        
        Duration expiration = Duration.ofSeconds(presignedUrlExpirationSeconds);
        var presignedRequest = s3Service.generatePresignedUrl(key, request.getContentType(), expiration);
        
        return PresignedUrlResponse.builder()
                .presignedUrl(presignedRequest.url().toString())
                .key(key)
                .objectUrl(s3Service.getObjectUrl(key))
                .expirationTime(Instant.now().plus(expiration).getEpochSecond())
                .build();
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());                  // converted list of foodEntities to response
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity databaseEntry = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found for the id : " + id));
        return convertToResponse(databaseEntry);
    }

    @Override
    public boolean deleteFile(String filename) {
        s3Service.deleteObject(filename);
        return true;
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);
        String imageUrl = response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        boolean isFileDelete = deleteFile(filename);
        if (isFileDelete){
            foodRepository.deleteById(id);
        }
    }



    private FoodEntity convertToEntity(FoodRequest request) {
       return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description((entity.getDescription()))
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
