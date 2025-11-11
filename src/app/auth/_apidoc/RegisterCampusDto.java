package com.genixo.education.search.dto.register;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterCampusDto {
    private Long userId;
    private Long brandId;
    private String name;
    private String email;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private Long districtId;
    private String postalCode;
    private Long countryId;
    private Long provinceId;




}
