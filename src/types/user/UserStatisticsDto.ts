export interface UserStatisticsDto {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  institutionUsers: number;
  parentUsers: number;
  usersRegisteredToday: number;
  usersRegisteredThisWeek: number;
  usersRegisteredThisMonth: number;
  usersLoggedInToday: number;
  usersLoggedInThisWeek: number;
  unverifiedEmailUsers: number;
  unverifiedPhoneUsers: number;
}
