/*================================
    Modelos de productos
*================================*/

import connection from "../database/db.js";

////////////////////
// Seleccionar todos los productos
const selectAllProducts = () => {
    // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
    // Sacamos SELECT * para evitar traer columnas innecesarias(+ eficiencia en memoria y en red)
    const sql = "SELECT id, name, price, image FROM products";

    // Hace una conexion a la BBDD y le tira esta consulta
    return connection.query(sql);
}


////////////////////
// Seleccionar producto por id
const selectProductById = (id) => {
    // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
    // Sacamos SELECT * para evitar traer columnas innecesarias(+ eficiencia en memoria y en red)
    const sql = "SELECT id, name, price, image, category, description FROM products where id = ?";

    // El valor del id se lo paso oculto en el siguiente parametro adentro de un array [id], asi se hace en mysql2
    return connection.query(sql, [id]);
}


////////////////////
// Crear nuevo producto
const insertProduct = (clearName, image, category, description, price) => {
    // Los placeholders "?" nos permiten realizar consultas SQL mas seguras (evitan inyeccion SQL)
    const sql = "INSERT INTO products (name, image, category, description, price) VALUES (?, ?, ?, ?, ?)";

    // Aca le paso el array de valores reales que va a reemplazar cada ? en el mismo orden
    return connection.query(sql, [clearName, image, category, description, price]);
}


////////////////////
// Modificar producto
const updateProduct = (name, image, price, category, description, id) => {
    let sql = `UPDATE products SET name = ?, image = ?, price = ?, category = ?, description = ? WHERE id = ?`;

    // Envia los datos 
    return connection.query(sql, [name, image, price, category, description, id]);
}


////////////////////
// Modificar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";

    return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}