import { Request } from 'express';
import { UserRole } from './enums';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  body: any;       // Evita errores en controladores al acceder a req.body
  params: any;     // Evita errores en rutas (req.params.id)
  query: any;      // Query strings para filtros
  headers: any;    // Para manejar tokens de autorización
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface HeatmapData {
  latitude: number;
  longitude: number;
  intensity: number;
  severity: string;
}

export interface IncidentFilter {
  categoryId?: string;
  status?: string;
  severity?: string;
  startDate?: Date;
  endDate?: Date;
  bounds?: BoundingBox;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
