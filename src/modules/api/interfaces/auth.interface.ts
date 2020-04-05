export interface AuthValidateData {
  token: string;
  expiredAt: number;
  refreshToken: string;
  firebaseToken: string;
  user: any;
}