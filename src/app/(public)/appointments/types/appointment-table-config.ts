/**
 * Configuration for appointment table behavior
 */
export interface AppointmentTableConfig {
  /**
   * Enable/disable row selection
   */
  enableSelection?: boolean;

  /**
   * Page size options for pagination
   */
  pageSizeOptions?: number[];

  /**
   * Initial page size
   */
  initialPageSize?: number;

  /**
   * Enable/disable click on row selection
   */
  disableRowSelectionOnClick?: boolean;
}

/**
 * Default configuration for the appointment table
 */
export const defaultAppointmentTableConfig: AppointmentTableConfig = {
  enableSelection: true,
  pageSizeOptions: [5, 10, 25, 50],
  initialPageSize: 10,
  disableRowSelectionOnClick: true,
};
