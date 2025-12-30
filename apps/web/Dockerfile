# -----------------------------------------------------------------------------
# ETAPA 1: BUILD (Constructor)
# Usamos una imagen de Node ligera para instalar dependencias y construir
# -----------------------------------------------------------------------------
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración de dependencias
COPY package.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación (genera la carpeta /dist)
RUN npm run build

# -----------------------------------------------------------------------------
# ETAPA 2: RUNNER (Producción)
# Usamos Nginx, un servidor web ultra rápido y ligero para servir los archivos
# -----------------------------------------------------------------------------
FROM nginx:alpine AS runner

# Copiamos la configuración de Nginx (opcional, usa la default por ahora)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos SOLO los archivos construidos (dist) de la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (el estándar web)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]