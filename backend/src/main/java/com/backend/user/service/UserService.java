package com.backend.user.service;


import com.backend.user.dto.UserRegistrationDto;
import com.backend.user.dto.UserResponseDto;
import com.backend.user.dto.UserUpdateDto;
import com.backend.user.entity.User;

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
