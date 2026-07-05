package com.backend.userAndSecurityManagement.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {


    // Add these fields to your User entity class

    @Column(name = "account_non_locked")
    private boolean accountNonLocked = true; // Defaults to true when a new user registers

    @Column(name = "enabled")
    private boolean enabled = true; // Defaults to true when a new user registers
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Assuming you have a Branch entity.
    // FetchType.LAZY is best practice for performance on ManyToOne.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "username", nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", length = 150)
    private String fullName;

    @Column(name = "mobile", length = 20)
    private String mobile;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "status", columnDefinition = "TINYINT DEFAULT 1")
    private Integer status;

    // This creates the Many-To-Many relationship through the 'user_roles' table
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}