export const jwtConstants = {
  accessTokenSecret: process.env.JWT_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpire: process.env.JWT_ACCESS_EXPIRE,
  refreshTokenExpire: process.env.JWT_REFRESH_EXPIRE,
};

export const secretExpire = {
  accessToken: {
    secret: jwtConstants.accessTokenSecret,
    expiresIn: jwtConstants.accessTokenExpire,
  },
  refreshToken: {
    secret: jwtConstants.refreshTokenSecret,
    expiresIn: jwtConstants.refreshTokenExpire,
  },
};

export type tokenDto = {
  accessToken: string;
  refreshToken: string;
};
