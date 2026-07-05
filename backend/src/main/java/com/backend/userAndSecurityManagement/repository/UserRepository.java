package com.backend.userAndSecurityManagement.repository;



import com.backend.userAndSecurityManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Spring automatically translates this into: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);

    // Useful for validation when registering a new user
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}