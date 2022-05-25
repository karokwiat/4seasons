export type AuthValue = {
  token: any;
  userName: any;
  isAuthenticated: boolean;
  authenticate: (data: { token: string; userName: string }) => void;
  logout: () => void;
};
