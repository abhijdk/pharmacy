package com.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Full name cannot be blank")
    private String fullName;

    private String mobile;

    private Integer branchId;

    private String roleName;

    // Note: I left out 'password'. It is a major security risk to allow
    // plain text passwords in a general PUT request. Password resets
    // should have their own dedicated, secure endpoint!
}