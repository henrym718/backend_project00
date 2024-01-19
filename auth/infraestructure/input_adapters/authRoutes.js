// Importamos el módulo de Express para crear el router
import express from "express";
const router = express.Router();

// Importamos el contenedor de Awilix para resolver las dependencias
import { authContainer } from "../../../config/dependencies/container.js"


//Resolvemos el controlador de autenticación del contenedor
const authController = authContainer.resolve('authController');

// Definimos la ruta de login y asociamos el método del controlador
router.post("/api/auth/logincredentials", (req, res, next) => {
    return authController.loginCredential(req, res, next)
});

// Aquí podrías definir más rutas para otras operaciones de autenticación

// Exportamos el router
export default router;
