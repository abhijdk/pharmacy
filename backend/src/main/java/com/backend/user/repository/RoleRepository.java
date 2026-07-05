package com.backend.user.repository;

import com.backend.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    // Useful for assigning default roles (like "Cashier") to new users
    Optional<Role> findByRoleName(String roleName);
}
