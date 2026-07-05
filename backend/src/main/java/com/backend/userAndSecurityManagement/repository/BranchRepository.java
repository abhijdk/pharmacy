package com.backend.userAndSecurityManagement.repository;

import com.backend.userAndSecurityManagement.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
    // Standard CRUD operations are inherited automatically
}