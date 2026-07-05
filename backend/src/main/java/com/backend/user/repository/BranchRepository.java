package com.backend.user.repository;

import com.backend.user.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
    // Standard CRUD operations are inherited automatically
}