FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

# Ejecuta solo la Web
# Pasamos --host para que se vea desde fuera
CMD ["npm", "run", "dev", "-w", "apps/web", "--", "--host", "0.0.0.0", "--port", "80"]