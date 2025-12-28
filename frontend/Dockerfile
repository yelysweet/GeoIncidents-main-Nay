# Imagen base de Node para producción
FROM node:18-alpine

WORKDIR /app

# Copiamos los archivos del proyecto
COPY . .

# Instalamos dependencias
RUN npm install

# Construimos el proyecto para producción
RUN npm run build

# Exponemos el puerto que usará Vite preview
EXPOSE 4173

# Comando para iniciar la app en Railway
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
