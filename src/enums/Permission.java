package com.genixo.education.search.entity.user;

import lombok.Getter;

@Getter
public enum Permission {

    APPROVAL,
    USER_CREATE,
    GENERAL,
    FINANCE_OPERATION,
    ACCOUNTING_OPERATION,
    DELIVERY_OPERATION,
    CUSTOMER_OPERATION,
    OFFER_OPERATION,
    ORDER_OPERATION,
    SUPPLIER_OPERATION,
    TRANSPORTATION_OPERATION,
    DELIVERY_DOCUMENT,
    SETTING;


    public String getPermission() {
        return this.name();
    }
}
