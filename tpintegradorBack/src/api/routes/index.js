/*========================
    Archivo de barril
========================*/

// Importacion de todas las rutas
// Se importa el objeto router ya configurado y se le asigna un nuevo nombre
import productRoutes from "./product.routes.js"; 
import viewRoutes from "./view.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";


// Centraliza todas las rutas y las exporta con un nombre
export {
    productRoutes,
    viewRoutes,
    authRoutes,
    userRoutes
}

// Este archivo simplemente se encarga de juntar todas las configuraciones de rutas para ser importados desde 1 solo lugar