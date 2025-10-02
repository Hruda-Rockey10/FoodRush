package com.project.foodiesapi.service;

import com.project.foodiesapi.entity.CartEntity;
import com.project.foodiesapi.io.CartRequest;
import com.project.foodiesapi.io.CartResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartService{
   CartResponse addToCart(CartRequest request);

   CartResponse getCart();

   void clearCart();

   CartResponse removeFromCart(CartRequest cartRequest);


}
