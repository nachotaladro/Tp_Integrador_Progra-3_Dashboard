/*================================
    Controladores de productos
*================================*/


import ProductModels from "../models/product.models.js";

// Los controladores se encargan de recibir las peticiones y mandar las respuestas 

// Basicamente aca pongo la logica de mis callbacks asincronos

////////////////////
// Get all products
export const getAllProducts = async (req, res) => {

    // Optimizacion 1: Manejar errores con try catch
    try {
        // Con el destructuring de array separamos los resultados (rows) y la metadata (field)
        // Cuando el await espera que se haya resuelto lo guarda en rows
        // Guarda en rows el array de filas con 0 o todos los elementos
        // El controlador le delega al modelo la comunicacion con la BBDD
        const [rows, fields] = await ProductModels.selectAllProducts(); //rows guarda los obj y en fields guarda metadata que en esa funcion no se usa

        // Optimizacion 4: Devolvemos error 404 si no hay productos
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos`
            })
        }

        // Respuesta exitosa (200 OK) devuelve un objeto JSON con payload: array de objetos de la BBDD y con total: total de prodectos
        res.status(200).json({
            payload: rows,
            total: rows.length   // Metadata util para el front
        });

    } catch (error) {
        console.log(error)

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: `Error interno del servidor al obtener productos`
        })
    }
}



////////////////////
// Get product by id
export const getProductById = async (req, res) => {

    // Optimizacion 1: Incorporo manejo de errores con try catch
    try {

        // Gracias al middleware validateId ya valido ese dato y lo recibo en req.id
        // El valor del id se lo paso oculto en el siguiente parametro adentro de un array [id], asi se hace en mysql2
        // Guarda en rows el array de filas con 0 o 1 elementos
        const [rows] = await ProductModels.selectProductById(req.id);

        // Optimizacion 4: Devolvemos error 404 si no hay productos con ese id
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos con id ${req.id}`
            })
        }

        // Respuesta exitosa
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log(error)

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: `Error interno del servidor al obtener productos`
        })
    }
}



////////////////////
// Create product
export const createProduct = async (req, res) => {

    // Optimizacion 1: Incorporo manejo de errores con try catch
    try{

        // Gracias al middleware router.use(express.json()) -> Recibimos un objeto JS ya parseado
    
        // Usamos destructuring de objetos
        // Extraemos los valores que vienen en el CUERPO (body) de la peticion http (HTTP Request del post.js)
        const { name, image, category, description, price } = req.body;

        // Optimizacion 3: Sanitizar los strings antes de insertarlos, para normalizar los datos
        const clearName = name.trim();
    
        // Le pasamos los datos del nuevo objeto al modelo que se va a comunicar con la BBDD
        // Guarda en rows metadata para saber que paso con la operacion
        const [result] = await ProductModels.insertProduct(clearName, image, category, description, price); //el result te da un insert que es solo metadata
    
        // Respuesta exitosa
        // Con rows.insertId obtenemos el id del nuevo producto
        // Optimizacion 5: En lugar de 200 OK, 201 Created
        res.status(201).json({
            message: `Producto con id ${result.insertId} creado con exito`,
            productId: result.insertId // Devolvemos info util como el nuevo id creado
        });

    } catch (error){
        console.log(error)

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: `Error interno del servidor al crear productos`
        })
    }
}


////////////////////
// Modify product
export const modifyProduct = async (req, res) => {

    // Optimizacion 1: Incorporo manejo de errores con try catch
    try{

        // Gracias al middleware router.use(express.json()) -> Recibimos un objeto JS ya parseado

        // Usamos destructuring de objetos
        // Extraemos los valores que vienen en el CUERPO (body) de la peticion http (HTTP Request del post.js)
        const { id, name, image, price, category, description } = req.body;
    
        // Envia los datos para modificar el objeto
        // Guarda en result metadata para saber que paso con la operacion
        const [result] = await ProductModels.updateProduct(name, image, price, category, description, id);
    
        // Optimizacion 2: Verificamos si realmente se actualizo algo
        if (result.affectedRows === 0 ){
            return res.status(404).json({
                message: `No se actualizo el producto`
            })
        }

        // Respuesta exitosa
        // Devolvemos una respuesta
        return res.status(200).json({
            message: `Producto actualizado correctamente`
        });

        // En caso de rejected se ejecuta el catch
    } catch (error) {
        console.log(error)

        // Optimizacion 3: Devolvemos errores 500
        res.status(500).json({
            message: `Error interno del servidor al modificar productos`
        })
    }
}

////////////////////
// Remove product
export const removeProduct = async (req, res) => {

    // Optimizacion 1: Incorporo manejo de errores con try catch
    try{

        // El middleware ya valida y anexa el id en req.id
        // const id = req.params.id;
    
        await ProductModels.deleteProduct(req.id);
    
        // Respuesta exitosa
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch(error){
        console.log(error)

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: `Error interno del servidor al eliminar productos`
        })
    }
}