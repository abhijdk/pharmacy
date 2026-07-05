package com.backend.user.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UserResponseDto {
    private Integer id;
    private String username;
    private String fullName;
    private String email;
    private String mobile;
    private Integer status;
    private Set<String> roles; // We only return the role names, not the whole Role entity
}