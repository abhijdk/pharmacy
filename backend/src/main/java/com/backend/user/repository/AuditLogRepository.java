package com.backend.user.repository;


import com.backend.user.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    // JpaRepository provides standard CRUD operations (save, findById, etc.) automatically.
    // You can add custom query methods here later if needed (e.g., find by adminUsername).
}