FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instala TODO, incluidas devDependencies (porque necesitamos tsc)
RUN npm install

COPY . .

# Compilar TS
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
