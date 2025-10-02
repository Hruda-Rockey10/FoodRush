package com.project.foodiesapi.service;

import com.project.foodiesapi.io.UserRequest;
import com.project.foodiesapi.io.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest request);

    String findByUserId();

}
