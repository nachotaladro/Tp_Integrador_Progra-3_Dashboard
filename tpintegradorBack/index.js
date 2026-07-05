////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";  // Config
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js"; // Importo desde el archivo de barril
import { join, __dirname } from "./src/api/utils/index.js" // Importamos dirname y join apuntando a la ruta del archivo index.js
import session from "express-session";  // Aca importamos el modulo session que instalamos con npm i express-session y se encuentra en node_module
const { port, session_key } = environments

////////////////////
// Config
const app = express();
const PORT = port;
// Configuramos EJS como motor de plantillas
// Los datos que traemos dentro de res.render("index") -> Internamente sabe que tiene que agarrar "index" de la carpeta ejs (index.ejs)
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views")); 



////////////////////
// Middlewares

// Los que dejamos aca son middlewares de aplicacion se ejecutan en TODAS las aplicaciones
// Funcion que se va a ejecutar en todas las peticiones y respuestas

// cors es un middleware ya armado
// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());

// Middleware logger para poder ver en consola toda la actividad de nuestro servidor
app.use(loggerURL);

// express.json() es un middleware ya armado
// middleware para parsear el JSON de las peticiones POST y PUT a objeto
// Middleware para parsear el JSON de las peticiones POST y PUT con la api fetch
app.use(express.json());

// Middleware para parsear info enviada con <forms>
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));
// Estoy diciendole a la app la ruta de donde va a servir archivos estaticos
// Podemos servir directamente archivos estaticos apuntando a /css/styles.css o /assets/img/pumpernic.png
// -> localhost:3000/css/styles.css




/*
Paso 1: Al hacer un login exitoso, creo una sesion

Paso 2: Con esta sesion creada redirijo a dashboard y ahi ya puedo navegar

Paso 3: Crearemos el middleware requireLogin para proteger las rutas y en cada llamada chequear si hay una sesion

Paso 4: Crear el boton para logout y redirigir a login
keep


npm i express-session

*/
/////////////////////////
// Middleware de sesion  /// No importante para la defensa
app.use(session({
    secret: session_key, // Firmamos las cookies para evitar manipulacion (protegemos la sesion con una contraseña)
    resave: false, // Evitamos guardar la sesion si no hubo cambios
    saveUnitialized: true // No guardamos sesiones vacias
}))






////////////////////
// Endpoints

// app.use  Llama a middleware de aplicacion

// Redirige todas las peticiones que apunten a /api/products a productRoutes
// Peticiones para traer solo los datos, no esta pensado para ser visible, funciona internamente
// Esto de aca queda registrado y cuando se quieran hacer peticiones a /api/products + ruta url, va a tener en cuenta la configuracion preivamente hecha
app.use("/api/products", productRoutes)

// Peticiones para traer las vistas, parte visible de la aplicacion
// Rutas de vistas (index, consultar, crear, modificar, eliminar)
// El /dashboard + vista especifica en viewRoutes
app.use("/dashboard", viewRoutes);

// Rutas de autentificacion
app.use("/login", authRoutes);

// Rutas de usuario
app.use("/api/users", userRoutes)


// app.get("/dashboard", (req, res) =>{
//     res.render("index")
// })



// Escuchamos en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})