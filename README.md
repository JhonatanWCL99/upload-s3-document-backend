# Aplicación Backend NestJS par subir archivos a S3 AWS

Aplicación para la subida de archivos en bucket S3 de AWS, tambien tiene las funcionalidades para registrar usuarios, como tambien para listado de archivos y usuarios.

## Instrucciones de instalación, configuración y despliegue

### Instalación
1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/JhonatanWCL99/upload-s3-document-backend
   
2. Navega al directorio del proyecto:
   ```bash
   cd nombre_del_proyecto

3. Instala las dependencias:
   ```bash
   npm install

### Configuración
4. Configuración de archivo .env en el directorio raíz del proyecto y agrega las siguientes variables de entorno:
    
    ```
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    AWS_S3_BUCKET=my-test-bucket
    AWS_REGION=your-region
    
    MONGODB=your-mongodb-path

5. Finalmente corra el siguiente comando para ejecutar el modo desarrollo:
    ```
    npm run start:dev

### Despliegue
6.  Previamente asegurarse de tener una instacia de EC2 de AWS configurada y accesible.

7.  Clona el repositorio en la instancia de EC2 y navega al directorio del proyecto.

8.  Instala las dependencias:
    ```
    npm install

9.  Generar el build para modo produccion:
    ```
    npm run build
    
10. Iniciar la aplicacion en modo produccion:
    ```
    npm run start:prod

