package com.genixo.education.search.entity.user;


import com.genixo.education.search.entity.BaseEntity;
import com.genixo.education.search.enumaration.RoleLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRole extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Enumerated(EnumType.STRING)
    private Role role;

    @ElementCollection(targetClass = Department.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<Department> departments = new HashSet<>();

    @ElementCollection(targetClass = Permission.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<Permission> permissions = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private RoleLevel roleLevel;

    private LocalDateTime expiresAt;

}
