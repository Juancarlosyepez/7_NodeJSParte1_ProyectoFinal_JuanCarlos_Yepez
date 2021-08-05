![](https://github.com/Juancarlosyepez/7_NodeJSParte1_ProyectoFinal_JuanCarlos_Yepez/blob/master/public/img/img1.png)
### Caracteristicas
La finalidad de la aplicación es simular el dibujo y edición de imágenes en tiempo real con más de un usuario haciendo uso deExpressJS; MongoDB y MongooseJS para la gestión de usuarios; Redis y PassportJS para el proceso de login; y finalmente implementar el concepto de Socket.IO para la edición en tiempo real de las imágenes.
La aplicación tiene las siguientes características y funcionalidades:

- La aplicación permite el registro de usuarios, y almacenarlos en una base de datos en MongoDB mediante un formulario de registro:
![](https://github.com/Juancarlosyepez/7_NodeJSParte1_ProyectoFinal_JuanCarlos_Yepez/blob/master/public/img/registro.png)
- La aplicación tiene un sistema de login, haciendo uso del concepto de PassportJS y Redis. Se podrá iniciar sesión con su respectivo nombre de usuario y su contraseña, y adicionalmente iniciar sesión a través de Twitter y facebook mediante un formulario de inicio de sesión, así como lo muestra la siguiente imagen:
![](https://github.com/Juancarlosyepez/7_NodeJSParte1_ProyectoFinal_JuanCarlos_Yepez/blob/master/public/img/img2.png)
- Al iniciar sesión, el usuario será direccionado a una interfaz donde se mostrarán todas las imágenes registradas y cargadas. Ésta interfaz contendrá una barra de navegación con las opciones de “galería” (interfaz por defecto del
usuario al iniciar sesión), donde se mostrarán dichas imágenes.
- La barra de navegación tiene como segunda opción “cargar imágenes, la cual al hacer su uso, el usuario será direccionado a una interfaz que contenga un formulario para realizar el proceso de subida de una nueva imagen a la
galería.  
- El usuario podrá seleccionar la imagen que desea editar y dibujar sobre ella, y deberá seleccionarla en la galería. Una vez seleccionada, será direccionado a una nueva interfaz que contendrá un componente de tipo canvas de HTML5. Adicionalmente, la interfaz deberá contener un componente de tipo botón que al ser presionado cargará la imagen en el canvas. La interfaz deberá contener junto al canvas una paleta de colores, que servirá para que el usuario pueda dibujar sobre la imagen cargada.
- La aplicación permite los dibujos de imágenes en tiempo real con más de un usuario, así como lo muestra la siguiente imagen: 
![](https://github.com/Juancarlosyepez/7_NodeJSParte1_ProyectoFinal_JuanCarlos_Yepez/blob/master/public/img/img6.png)