package com.backend.user.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "permission_name", nullable = false, length = 100)
    private String permissionName;

    @Column(name = "module", length = 100)
    private String module;

    // Bidirectional mapping (Optional but helpful if you want to find all roles for a specific permission)
    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new HashSet<>();
}
