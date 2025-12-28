import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload } from '../types';
import { UserRole } from '../types/enums';

// Tipo seguro para expiresIn
type ExpiresInType = SignOptions["expiresIn"];

// Opciones del token de acceso
const accessTokenOptions: SignOptions = {
  expiresIn: (config.jwt.expiresIn || '7d') as ExpiresInType,
  algorithm: 'HS256',
};

// Opciones del refresh token
const refreshTokenOptions: SignOptions = {
  expiresIn: (config.jwt.refreshExpiresIn || '30d') as ExpiresInType,
  algorithm: 'HS256',
};

export const generateToken = (
  payload: { userId: string; email: string; role: UserRole }
): string => {
  return jwt.sign(payload, config.jwt.secret as string, accessTokenOptions);
};

export const generateRefreshToken = (
  payload: { userId: string }
): string => {
  return jwt.sign(payload, config.jwt.secret as string, refreshTokenOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret as string) as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
};
