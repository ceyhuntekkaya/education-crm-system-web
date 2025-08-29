package com.genixo.education.search.entity.user;


import com.genixo.education.search.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import com.genixo.education.search.enumaration.AccessType;

import java.time.LocalDateTime;


@Entity
@Table(name = "user_institution_access")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserInstitutionAccess extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Hangi düzeyde erişim (Brand, Campus, School)
    @Enumerated(EnumType.STRING)
    @Column(name = "access_type", nullable = false)
    private AccessType accessType;

    // İlgili entity'nin ID'si (brand_id, campus_id, school_id)
    @Column(name = "entity_id", nullable = false)
    private Long entityId;

    @Column(name = "granted_at", nullable = false)
    private LocalDateTime grantedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
}