package com.backend.userAndSecurityManagement.security.controller;

import com.backend.userAndSecurityManagement.dto.*;
import com.backend.userAndSecurityManagement.security.JwtUtil;
import com.backend.userAndSecurityManagement.security.dto.JwtResponseDto;
import com.backend.userAndSecurityManagement.security.dto.LoginRequestDto;
import com.backend.userAndSecurityManagement.security.dto.PasswordResetDto;
import com.backend.userAndSecurityManagement.security.service.AuditService;
import com.backend.userAndSecurityManagement.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuditService auditService; // Added for logging requirements

    // ==========================================
    //            AUTHENTICATION (Public)
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDto(jwt, userDetails.getUsername(), roles));
    }

    // ==========================================
    //      ADMIN-ONLY USER MANAGEMENT CRUD
    // ==========================================

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto, HttpServletRequest request) {
        try {
            UserResponseDto response = userService.registerNewUser(registrationDto);
            logAction("USER_CREATED", response.getId(), request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(userService.getUserById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @Valid @RequestBody UserUpdateDto updateDto, HttpServletRequest request) {
        try {
            UserResponseDto updatedUser = userService.updateUser(id, updateDto);
            logAction("USER_UPDATED", id, request);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id, HttpServletRequest request) {
        try {
            userService.deleteUser(id);
            logAction("USER_DELETED", id, request);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ==========================================
    //      ADMIN-ONLY ADVANCED OPERATIONS
    // ==========================================

    @PostMapping("/users/{id}/password-reset")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> resetPassword(@PathVariable Integer id, @Valid @RequestBody PasswordResetDto dto, HttpServletRequest request) {
        userService.resetPassword(id, dto.getNewPassword());
        logAction("PASSWORD_RESET", id, request);
        return ResponseEntity.ok("Password reset successfully.");
    }

    @PutMapping("/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> changeUserStatus(@PathVariable Integer id, @RequestParam boolean isLocked, @RequestParam boolean isActive, HttpServletRequest request) {
        userService.updateUserStatus(id, isLocked, isActive);
        logAction("STATUS_CHANGED (Locked: " + isLocked + ", Active: " + isActive + ")", id, request);
        return ResponseEntity.ok("User status updated.");
    }

    @PutMapping("/users/{id}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignRoles(@PathVariable Integer id, @RequestBody List<String> roles, HttpServletRequest request) {
        userService.updateUserRoles(id, roles);
        logAction("ROLES_CHANGED", id, request);
        return ResponseEntity.ok("User roles updated successfully.");
    }

    // ==========================================
    //            HELPER METHODS
    // ==========================================

    private void logAction(String action, Integer targetUserId, HttpServletRequest request) {
        String adminUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        String ipAddress = request.getRemoteAddr();
        // Fallback for proxies/load balancers
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            ipAddress = xForwardedFor.split(",")[0];
        }

        auditService.logAdminAction(adminUsername, targetUserId, action, ipAddress);
    }
}