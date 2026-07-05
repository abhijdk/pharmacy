package com.backend.userAndSecurityManagement.service.impl;

import com.backend.userAndSecurityManagement.dto.UserRegistrationDto;
import com.backend.userAndSecurityManagement.dto.UserResponseDto;
import com.backend.userAndSecurityManagement.dto.UserUpdateDto;
import com.backend.userAndSecurityManagement.entity.Branch;
import com.backend.userAndSecurityManagement.entity.Role;
import com.backend.userAndSecurityManagement.entity.User;
import com.backend.userAndSecurityManagement.repository.BranchRepository;
import com.backend.userAndSecurityManagement.repository.RoleRepository;
import com.backend.userAndSecurityManagement.repository.UserRepository;
import com.backend.userAndSecurityManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BranchRepository branchRepository; // Added to find the branch
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponseDto registerNewUser(UserRegistrationDto dto) {

        // 1. Check for duplicates
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(dto.getEmail()) && dto.getEmail() != null) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // 2. Fetch relationships (Branch and Role)
        Branch branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new RuntimeException("Error: Branch not found!"));

        Role userRole = roleRepository.findByRoleName(dto.getRoleName())
                .orElseThrow(() -> new RuntimeException("Error: Role '" + dto.getRoleName() + "' is not found."));

        // 3. Map DTO to Entity
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword())); // Hash the plain text password
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setStatus(1); // Default active status
        user.setBranch(branch);
        user.getRoles().add(userRole);

        // 4. Save to database
        User savedUser = userRepository.save(user);

        // 5. Map Entity back to Response DTO
        return mapToResponseDto(savedUser);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Helper method to convert User Entity to UserResponseDto safely
    private UserResponseDto mapToResponseDto(User user) {
        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setId(user.getId());
        responseDto.setUsername(user.getUsername());
        responseDto.setFullName(user.getFullName());
        responseDto.setEmail(user.getEmail());
        responseDto.setMobile(user.getMobile());
        responseDto.setStatus(user.getStatus());

        // Extract just the role names into a Set of Strings
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        responseDto.setRoles(roleNames);

        return responseDto;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                // We use the mapToResponseDto helper method we built in the last step!
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }


    // Fetch a single user by ID
    // Changed parameter from Long to Integer
    @Override
    public UserResponseDto getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Using your existing helper method instead of a constructor!
        return mapToResponseDto(user);
    }

    // Update an existing user
    // Changed parameter from Long to Integer
    @Override
    @Transactional
    public UserResponseDto updateUser(Integer id, UserUpdateDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // 1. Update basic text fields
        user.setUsername(updateDto.getUsername());
        user.setEmail(updateDto.getEmail());
        user.setFullName(updateDto.getFullName());
        user.setMobile(updateDto.getMobile());

        // 2. Update Branch if provided in the JSON
        if (updateDto.getBranchId() != null) {
            Branch branch = branchRepository.findById(updateDto.getBranchId())
                    .orElseThrow(() -> new RuntimeException("Error: Branch not found!"));
            user.setBranch(branch);
        }

        // 3. Update Role if provided in the JSON
        if (updateDto.getRoleName() != null) {
            Role userRole = roleRepository.findByRoleName(updateDto.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Error: Role '" + updateDto.getRoleName() + "' is not found."));

            // Clear old roles and add the new one
            user.getRoles().clear();
            user.getRoles().add(userRole);
        }

        // 4. Save and return
        User updatedUser = userRepository.save(user);
        return mapToResponseDto(updatedUser);
    }

    // Delete a user
    // Changed parameter from Long to Integer
    @Override
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public void updateUserStatus(Integer id, boolean isLocked, boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        user.setAccountNonLocked(!isLocked); // Assuming standard Spring Security UserDetails fields
        user.setEnabled(isActive);           // Assuming standard Spring Security UserDetails fields

        userRepository.save(user);
    }// Make sure PasswordEncoder is injected via constructor or @RequiredArgsConstructor
    // private final PasswordEncoder passwordEncoder;

    @Transactional
    public void resetPassword(Integer id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // FIXED: Changed setPassword to setPasswordHash to match your entity
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public void updateUserRoles(Integer id, List<String> roles) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Fetch the actual Role entities from the database using your specific repository method
        Set<Role> updatedRoles = roles.stream()
                .map(roleName -> roleRepository.findByRoleName(roleName)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                .collect(Collectors.toSet());

        // Clear existing roles and add the new ones
        user.getRoles().clear();
        user.getRoles().addAll(updatedRoles);

        userRepository.save(user);
    }

}