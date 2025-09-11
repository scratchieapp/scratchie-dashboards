export type UserRole = 
  | 'Company Owner'
  | 'Company Admin'
  | 'Site Superadmin'
  | 'Site Admin'
  | 'Site Manager'
  | 'Site Worker';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: UserRole;
  status: UserStatus;
  sites?: string[];
  department?: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  awardsReceived?: number;
  recognitionsGiven?: number;
}

export interface UserActivity {
  month: string;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
}