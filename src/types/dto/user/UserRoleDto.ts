import { SchoolDto } from "../institution";

export interface UserRoleDto {
    /** Format: int64 */
    id?: number;
    /** Format: int64 */
    userId?: number;
    /** @enum {string} */
    role?: "USER" | "ADMIN" | "CANDIDATE" | "COMPANY";
    departments?: ("AUTHOR" | "GRADER" | "SUPERVISOR" | "MANAGEMENT" | "IT" | "AUTHOR_REVIEWER" | "ADMIN" | "REVIEWER")[];
    permissions?: ("APPROVAL" | "USER_CREATE" | "GENERAL" | "FINANCE_OPERATION" | "ACCOUNTING_OPERATION" | "DELIVERY_OPERATION" | "CUSTOMER_OPERATION" | "OFFER_OPERATION" | "ORDER_OPERATION" | "SUPPLIER_OPERATION" | "TRANSPORTATION_OPERATION" | "DELIVERY_DOCUMENT" | "SETTING")[];
    /** @enum {string} */
    roleLevel?: "BRAND" | "CAMPUS" | "SCHOOL" | "SYSTEM";
    /** Format: date-time */
    expiresAt?: string;
    schools?: SchoolDto[];
};