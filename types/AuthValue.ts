export type AuthValue = {
  token: any;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};
