package com.backend.security.service;

import com.backend.user.entity.AuditLog;
import com.backend.user.repository.AuditLogRepository; // Ensure this import is present
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditService {
    private final AuditLogRepository auditLogRepository;

    public void logAdminAction(String adminUsername, Integer targetUserId, String action, String ipAddress) {
        AuditLog log = new AuditLog();
        log.setAdminUsername(adminUsername);
        log.setTargetUserId(targetUserId);
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        log.setIpAddress(ipAddress);

        auditLogRepository.save(log);
    }
}