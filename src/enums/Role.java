package com.genixo.education.search.entity.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import static com.genixo.education.search.entity.user.Permission.*;


@Getter
@RequiredArgsConstructor
public enum Role {

    USER(
            Set.of(
                    USER_CREATE,
                    SETTING

            )
    ),
    ADMIN(
            Set.of(
                    GENERAL

            )
    ),
    CANDIDATE(
            Set.of(
                    GENERAL

            )
    ),
    COMPANY(
            Set.of(
                    GENERAL

            )
    );

    private final Set<Permission> permissions;


}