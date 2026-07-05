/*================================
    Modelos de usuario
*================================*/

import connection from "../database/db.js";

// TO DO, endpoint para crear usuarios admin

////////////////////
// Seleccionar usuarios admin
/*
const selectAdminUsers = (email, password) => {
        
    const sql = "SELECT * FROM users where email = ?  AND password = ?";

    return connection.query(sql, [email, password]);
}
*/
// Nuevo modelo con bcrypt, solo necesitamos el email
const selectAdminUsers = (email) => {
        
    const sql = "SELECT * FROM users where email = ?";

    return connection.query(sql, [email]);
}


////////////////////
// Crear usuarios admin
const insertAdminUser = (email, password) => {

    const sql = "INSERT into users (email, password) VALUES (?, ?)"

    return connection.query(sql, [email, password]);
}

export default {
    selectAdminUsers,
    insertAdminUser
}