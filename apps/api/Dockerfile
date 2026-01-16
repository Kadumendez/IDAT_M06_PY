FROM node:18-alpine

WORKDIR /app

# Copiamos todo
COPY . .

# Instalamos dependencias
RUN npm install

# Exponemos el puerto
EXPOSE 3001

# Ejecuta solo el script de la API
# "-w apps/api" significa: workspace apps/api
CMD ["npm", "run", "dev", "-w", "apps/api"]