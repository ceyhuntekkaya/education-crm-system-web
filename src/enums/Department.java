package com.genixo.education.search.entity.user;

import lombok.Getter;

@Getter
public enum Department {


    AUTHOR("AUTHOR"),
    GRADER("GRADER"),
    SUPERVISOR("SUPERVISOR"),
    MANAGEMENT("MANAGEMENT"),
    IT("IT"),
    AUTHOR_REVIEWER("AUTHOR_REVIEWER"),
    ADMIN("ADMIN"),
    REVIEWER("REVIEWER");

    private final String department;

    Department(String department) {
        this.department = department;
    }

}
