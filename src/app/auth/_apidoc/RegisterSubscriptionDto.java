package com.genixo.education.search.dto.register;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterSubscriptionDto {
    private Long userId;
    private Long subscriptionId;
}
