package com.project.foodiesapi.service;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import java.time.Duration;

public interface S3Service {
    PresignedPutObjectRequest generatePresignedUrl(String key, String contentType, Duration expiration);
    String getObjectUrl(String key);
    void deleteObject(String key);
}
