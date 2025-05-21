import { Request } from 'express';

export const getClientIp = (req: Request): string => {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    ''
  );
};

export const getUserAgent = (req: Request): string => {
  return req.headers['user-agent'] || '';
};
