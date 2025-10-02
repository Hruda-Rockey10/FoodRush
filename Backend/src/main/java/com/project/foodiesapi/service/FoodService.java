package com.project.foodiesapi.service;

import com.project.foodiesapi.io.FoodRequest;
import com.project.foodiesapi.io.FoodResponse;
import com.project.foodiesapi.io.PresignedUrlRequest;
import com.project.foodiesapi.io.PresignedUrlResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);
    FoodResponse addFood(FoodRequest request , MultipartFile file);
    FoodResponse addFoodWithPresignedUrl(FoodRequest request, String imageKey);
    PresignedUrlResponse generatePresignedUrl(PresignedUrlRequest request);
    List<FoodResponse> readFoods();
    FoodResponse readFood(String id);

    boolean deleteFile(String filename);
    void deleteFood(String id);
}
