# Usamos Node directo (sin Nginx complejo)
FROM node:18-alpine

WORKDIR /app

# Copiamos todo
COPY . .

# Instalamos todo (incluyendo devDependencies para que Vite funcione)
RUN npm install

# Exponemos el puerto 80
EXPOSE 80


CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "80"]