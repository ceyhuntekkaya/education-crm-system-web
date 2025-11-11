package com.genixo.education.search.dto.register;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterIdentityDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phone;

}
