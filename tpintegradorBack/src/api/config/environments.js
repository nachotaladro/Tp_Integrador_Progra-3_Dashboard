// Importamos el modulo dotenv para leer y exportar las variables de entorno
import dotenv from "dotenv";

// Leemos las variables de entorno del archivo .env
dotenv.config(); // el valor de estas variables ya es accesible desde process.env.NOMBRE_VARIABLE

// Exporta estos valores como objetos (port y database), pero de forma anonima, protegidos
export default {
    port: process.env.PORT || 3100,    // En caso de no encontrar el puerto se usa directamente el hardcodedado
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}

// Basicamente accede y lee las variables del .env (informacion sensible) y las exporta