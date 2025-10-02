package com.project.foodiesapi.controller;

import com.project.foodiesapi.io.AuthenticationRequest;
import com.project.foodiesapi.io.AuthenticationResponse;
import com.project.foodiesapi.service.AppUserDetailsService;
import com.project.foodiesapi.util.JWTUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail() , request.getPassword()));
       final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
       final String jwtToken = jwtUtil.generateToken(userDetails);
       return new AuthenticationResponse(request.getEmail() , jwtToken);
    }
}
