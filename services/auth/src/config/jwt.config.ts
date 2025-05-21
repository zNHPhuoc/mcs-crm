export const jwtConstants = {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
