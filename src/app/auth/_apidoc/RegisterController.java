package com.genixo.education.search.api.rest;

import com.genixo.education.search.dto.register.*;
import com.genixo.education.search.dto.user.UserDto;
import com.genixo.education.search.service.EmailService;
import com.genixo.education.search.service.RegisterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User Management", description = "APIs for user registration, authentication, profile management, and access control")
public class RegisterController {

    private final RegisterService registerService;
    private final EmailService emailService;




    @PostMapping("/step/1/credential")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerUser(
            @RequestBody RegisterCredentialDto registerCredentialDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerCredential(registerCredentialDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/2/identity")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerIdentity(
            @RequestBody RegisterIdentityDto registerIdentityDto,
            HttpServletRequest request) throws Exception {

        UserDto dto = registerService.registerIdentity(registerIdentityDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/3/confirm")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerConfirm(
            @RequestBody RegisterConfirmDto registerConfirmDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerConfirm(registerConfirmDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/4/campus")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerCampus(
            @RequestBody RegisterCampusDto registerCampusDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerCampus(registerCampusDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/5/subscription")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerSubscription(
            @RequestBody RegisterSubscriptionDto registerSubscriptionDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerSubscription(registerSubscriptionDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/6/payment")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerPayment(
            @RequestBody RegisterPaymentDto registerPaymentDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerPayment(registerPaymentDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/step/7/")
    @Operation(summary = "Register new user", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid registration data or user already exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "422", description = "Validation errors")
    })
    public ResponseEntity<ApiResponse<UserDto>> registerVerification(
            @RequestBody RegisterVerificationCodeDto registerVerificationCodeDto,
            HttpServletRequest request) {
        UserDto dto = registerService.registerVerification(registerVerificationCodeDto);
        ApiResponse<UserDto> response = ApiResponse.success(dto, "Post retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/send")
    @Operation(summary = "Get post by ID", description = "Get post details by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Email retrieved successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Email not found"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<ApiResponse<String>> getPostById(
            HttpServletRequest request) throws Exception {

        log.debug("Send email");

        emailService.sendCode("1234", "ceyhun.tekkaya@gmail.com", "Ceyhun", "Tekkaya");

        ApiResponse<String> response = ApiResponse.success("ok.", "Email retrieved successfully");
        response.setPath(request.getRequestURI());
        response.setTimestamp(LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

}


