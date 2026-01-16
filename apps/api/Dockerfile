FROM node:18-alpine

WORKDIR /app

# Copiamos todo el código de la API
COPY . .

# Instalamos dependencias
RUN npm install

# Exponemos el puerto que el API (3001)
EXPOSE 3001

# Comando de inicio (ajusta si el comando es diferente en package.json)
CMD ["npm", "run", "dev"]