/*================================
    Controladores de vistas
*================================*/

import ProductModels from "../models/product.models.js";

// Los controladores se encargan de recibir las peticiones y mandar las respuestas

// res.render("...", {}) ya sabe como ubicar a "..." gracias a la configuracion EJS del index.js main

// Vista ver - index
export const indexView = async (req, res) => {

    try {
        // Guarda en rows el array de filas con 0 o todos los elementos
        // El controlador le delega al modelo la comunicacion con la BBDD
        const [rows] = await ProductModels.selectAllProducts();

        // Le mandamos a "index" los datos bajo los siguientes nombres
        res.render("index", {
            title: "Principal",
            about: "Nuestros productos",
            productsArray: rows // Le pasamos a la plantilla EJS este array de productos
        })

    } catch (error) {
        console.log(error);
    }
}


// Vista consultar
export const getView = (req, res) => {

    // Le mandamos a "get" los datos bajo los siguientes nombres
    res.render("get", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
}


// Vista crear
export const postView = (req, res) => {

    // Le mandamos a "post" los datos bajo los siguientes nombres
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
}


// Vista modificar
export const putView = (req, res) => {

    // Le mandamos a "put" los datos bajo los siguientes nombres
    res.render("put", {
        title: "Modificar",
        about: "Modificar producto por id:"
    });
}


// Vista eliminar
export const deleteView = (req, res) => {

    // Le mandamos a "delete" los datos bajo los siguientes nombres
    res.render("delete", {
        title: "Eliminar",
        about: "Eliminar producto por id:"
    });
}