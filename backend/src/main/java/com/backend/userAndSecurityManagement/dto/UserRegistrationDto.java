package com.backend.userAndSecurityManagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegistrationDto {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password; // We take plain text here, hash it in the service

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String mobile;

    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Branch ID is required")
    private Integer branchId;

    @NotBlank(message = "Role name is required")
    private String roleName;
}