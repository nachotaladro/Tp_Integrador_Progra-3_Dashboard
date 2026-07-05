/*================================
    Controladores de usuarios
*================================*/

import userModels from "../models/user.models.js";
import bcrypt from "bcrypt";

////////////////////
// Create admin user
export const createAdminUser = async (req, res) => {

    try{
        console.table(req.body);

        const {emailUser, passwordUser } = req.body;
    
        // Bcrypt 1: Hasheamos el password del nuevo usuario admin
        // Cuantas veces bcrypt aplicara el algoritmo internamente (10 estandar)
        const salRounds = 10;

        // Esperamos a que hashee el password
        const hashedPassword = await bcrypt.hash(passwordUser, salRounds);

        const [result] = await userModels.insertAdminUser(emailUser, hashedPassword); //result es metadata 
    
        res.status(201).json({
            message: `Usuario creado con exito con id ${result.insertId}`,
            productId: result.insertId // Devolvemos info util como el nuevo id creado
        });
    } catch (error){
        console.log(error)

        res.status(500).json({
            message: `Error interno del servidor al crear usuarios`
        })
    }
}