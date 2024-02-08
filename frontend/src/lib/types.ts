export type IUser = {
  email: string;
  accessToken: string;
};

export type IContextType = {
  auth: IUser;
  persist: boolean;
  setAuth: React.Dispatch<React.SetStateAction<IUser>>;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};
