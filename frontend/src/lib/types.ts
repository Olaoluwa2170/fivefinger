export type IUser = {
  email: string;
  accessToken: string;
};

export type IContextType = {
  auth: IUser;
  setAuth: React.Dispatch<React.SetStateAction<IUser>>;
};
