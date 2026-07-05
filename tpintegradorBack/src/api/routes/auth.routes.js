/*========================
    Rutas autenticacion
========================*/

import { Router } from "express";
import { loginDestroy, loginUser, loginView } from "../controllers/auth.controllers.js";
const router = Router();


////////////////
// Vista login
router.get("/", loginView);


//////////////////////
// Funcionalidad login
router.post("/", loginUser)

//////////////////////
// Funcionalidad logout
router.get("/destroy", loginDestroy)


export default router;