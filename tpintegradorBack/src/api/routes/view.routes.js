/*========================
    Rutas vistas
========================*/


import { Router } from "express"; // Middleware router que funciona como una aplicacion express. Nativo de express
import { deleteView, getView, indexView, postView, putView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

// Configuracion del objeto router para que ya tenga todas las rutas posibles (resto del url) en el momento en el que sea llamado
// Y que se ejecute tanto el middleware y el controlador correspondiente a la url solicitada

// El middleaare hace que antes de servir cada vista chequeamos si existe una sesion, por seguridad, para proteger de un acceso sin login
// Sino redirecciona

// Solo usamos el metodo get porque queremos mostrar una pantalla HTML y no procesar o modificar datos

// Cada router incorpora: La parte de cada ruta, un middleware y su controlado


// Ver
router.get("/index", requireLogin, indexView);

// Consultar
router.get("/consultar", requireLogin, getView);

// Crear
router.get("/crear", requireLogin, postView);

// Modificar
router.get("/modificar", requireLogin, putView);

// Eliminar
router.get("/eliminar", requireLogin, deleteView);

export default router;