package com.project.foodiesapi.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.foodiesapi.io.FoodRequest;
import com.project.foodiesapi.io.FoodResponse;
import com.project.foodiesapi.io.PresignedUrlRequest;
import com.project.foodiesapi.io.PresignedUrlResponse;
import com.project.foodiesapi.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {
    private final FoodService foodService;

    @PostMapping
    public FoodResponse addFood(@RequestPart("food") String foodString ,
                                @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try {
          request = objectMapper.readValue(foodString , FoodRequest.class);
        }catch (JsonProcessingException ex) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST , "Invalid JSON Format");
        }
        FoodResponse response = foodService.addFood(request,file);
        return response;
    }

    @GetMapping
    public List<FoodResponse> readFoods() {
        return foodService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable String id) {
        return foodService.readFood(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id) {
        foodService.deleteFood(id);
    }
    
    @PostMapping("/presigned-url")
    public PresignedUrlResponse generatePresignedUrl(@RequestBody PresignedUrlRequest request) {
        return foodService.generatePresignedUrl(request);
    }
    
    @PostMapping("/with-presigned-url")
    public FoodResponse addFoodWithPresignedUrl(@RequestPart("food") String foodString,
                                               @RequestParam("imageKey") String imageKey) {
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON Format");
        }
        return foodService.addFoodWithPresignedUrl(request, imageKey);
    }
}
