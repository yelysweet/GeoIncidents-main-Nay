import dotenv from 'dotenv';
import path from 'path';

/**
 * Cargar explícitamente el .env desde la carpeta backend
 */
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

/**
 * Verificación de carga
 */
console.log('DATABASE_URL CARGADA =>', process.env.DATABASE_URL);

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),

  database: {
    url: process.env.DATABASE_URL!, 
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  mlService: {
    url: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  },

  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/quicktime',
    ],
  },

  // 🚀 CORS para producción (Vercel) + desarrollo local
  cors: {
    origin: [
      process.env.CORS_ORIGIN,                      // tomado desde Railway
      'https://geo-incidents-main-nays.vercel.app', // dominio principal en Vercel
      /\.vercel\.app$/,                             // todas las previews *.vercel.app
    ],
    credentials: true,
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
};

/**
 * Habilitar localhost solo en desarrollo
 */
if (config.env === 'development') {
  (config.cors.origin as string[]).push('http://localhost:5173');
}

console.log('CORS ORIGINS =>', config.cors.origin);
