export interface UserEntity {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  lastLogin?: Date;
}

export interface UserEntityWithToken {
  user: UserEntity;
  token: {
    token: string;
    tokenExpiration?: Date;
    refreshToken?: string;
    refreshTokenExpiration?: Date;
  };
}
