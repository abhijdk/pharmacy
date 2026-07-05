package com.backend.userAndSecurityManagement.service;


import com.backend.userAndSecurityManagement.dto.UserRegistrationDto;
import com.backend.userAndSecurityManagement.dto.UserResponseDto;
import com.backend.userAndSecurityManagement.dto.UserUpdateDto;
import com.backend.userAndSecurityManagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    // Core method for user registration
    UserResponseDto registerNewUser(UserRegistrationDto registrationDto);

    // Required for Spring Security to load the user during login
    Optional<User> findByUsername(String username);

    // Validation methods to prevent duplicate accounts
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    List<UserResponseDto> getAllUsers();

    public void deleteUser(Integer id);
    public UserResponseDto updateUser(Integer id, UserUpdateDto updateDto);
    public UserResponseDto getUserById(Integer id);


    void updateUserStatus(Integer id, boolean isLocked, boolean isActive);

    void resetPassword(Integer id, String newPassword);

    void updateUserRoles(Integer id, List<String> roles);
}
