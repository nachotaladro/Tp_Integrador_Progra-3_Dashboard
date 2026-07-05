/*========================
    Rutas producto
========================*/

import { Router } from "express";  // Middleware router que funciona como una aplicacion express. Nativo de express
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

// Creacion del objeto router con los metodos GET, POST, PUT y DELETE
const router = Router(); 


// Configuracion del objeto router para que ya tenga todas las rutas posibles (resto del url) en el momento en el que sea llamado
// Y que se ejecute tanto el middleware y el controlador correspondiente a la url solicitada

// GET all products - Ruta que no se usa, solo manualmente (index.ejs ve los datos de otra forma)
router.get("/", getAllProducts);



// Cada router incorpora: La parte de cada ruta, un middleware y su controlador

// GET product by id - Consultar
// :id es una variable cuyo valor se va a capturar con el objeto request
router.get("/:id", validateId, getProductById);


// POST product - Crear
router.post("/", validateProduct, createProduct);


// PUT product - Modificar
router.put("/", validateProduct, modifyProduct);


// DELETE product - Eliminar
router.delete("/:id", validateId, removeProduct);


// Aca estoy exportando el objeto router pero ya configurado para cada posible ruta
export default router;
// Con default se le puede poner un nombre particular