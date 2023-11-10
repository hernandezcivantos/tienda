# Trabajo voluntario de Desarrollo Web en Entorno Servidor

## Tienda Online

## Objetivos
- Implementar una aplicación web basada en la arquitectura de 3 capas estudiada en
  el módulo
- Diseñar la interfaz web basada en HTML. Como mínimo deberá tener un formulario
  de acceso para los usuarios ya registrados y otro formulario de registro para
  aquellos clientes nuevos, los datos mínimos de contacto que debe insertar el
  cliente/usuario, y el criterio de dato obligatorio o dato opcional, los establecerá el
  alumno según su libre consideración, explicando porque ha considerado cada uno
  de esos criterios
- Diseñar la capa intermedia donde se implementará la lógica de negocio de nuestra
  aplicación web.
- Diseñar e implementar el diagrama E-R de la base de datos, que se complementarán
  con el diagrama DSD (diagramas de estructura de datos ) y el diagrama DFD
  (diagramas de flujo de datos). Adicionalmente, el diagrama E-R se complementará
  con la explicación detallada de cada una de las entidades en las que, como mínimo,
  se explicará el propósito y alcance de la entidad, PK, FK, el resto de atributos,
  relación, y cardinalidad.
- Es obligatorio utilizar el control del estado de las aplicaciones, utilizando el control
  de sesiones, y aplicando las funciones de PHP estudiadas.
- Se requiere programar la utilización de las técnicas de acceso a datos estudiadas en
  el módulo.
- Subir y publicar la aplicación web en un servidor real, aunque no es obligatorio para
  la resolución de este trabajo, es muy recomendable que la aplicación se aloje en un
  servidor web (hay diferentes servicios en internet de carácter gratuito, que aunque
  presenta algunas limitaciones y a cambio de prestar el servicio suelen presentar
  publicidad a los usuarios, nos debería permitir albergar una solución pequeña como
  la que se propone).


## Autor

- [Francisco Hernández Civantos @hernandezcivantos](https://www.github.com/hernandezcivantos)

## Instalación

Tenemos que instalar las dependencias de composer

```bash
composer install
```

Tenemos que instalar las dependencias de npm

```bash
npm install
```
Tendremos que generar las keys de laravel, mediante la interfaz gráfica o:

```bash
php artisan key:generate
```
Tenemos que hacer el link del storage público para poder visualizar las imágenes:

```bash
php artisan storage:link
```

## Base de datos

Hay 2 formas:

### Con laravel

Tendremos que correr las migraciones y seeds de laravel

```bash
php artisan migrate
```

```bash
php artisan db:seed
```

### Con sql

Junto a los archivos del proyecto está el .sql completo con la base de datos para funcionar
