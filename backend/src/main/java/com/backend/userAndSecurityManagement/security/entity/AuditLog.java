package com.backend.userAndSecurityManagement.security.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data // Lombok
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminUsername;
    private Integer targetUserId;
    private String action;
    private LocalDateTime timestamp;
    private String ipAddress;
}