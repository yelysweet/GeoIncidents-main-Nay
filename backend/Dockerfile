# ---- Etapa de build ----
FROM node:20-alpine as build
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el proyecto y compilar
COPY . .
RUN npm run build

# ---- Etapa de ejecución ----
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app /app

# Variables necesarias (luego las pondremos en Railway)
ENV NODE_ENV=production
# Puerto estándar
EXPOSE 3000

# Iniciar backend
CMD ["npm", "start"]
