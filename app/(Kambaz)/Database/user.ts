export type Role = "USER" | "ADMIN" | "FACULTY" | "STUDENT" | "TA";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: Role;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}
