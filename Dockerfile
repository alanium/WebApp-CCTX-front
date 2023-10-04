# Usa una imagen base que tenga Node.js instalado
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /contempo

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación React para producción
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
