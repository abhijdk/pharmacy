package com.backend.userAndSecurityManagement.repository;

import com.backend.userAndSecurityManagement.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    // Standard CRUD operations are inherited automatically
}