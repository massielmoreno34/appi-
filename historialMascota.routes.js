import express from "express";
import { MostrarHistorialMascota } from "../controllers/historialMascota.controllers.js";
import { actualizarInformacionMascota } from "../controllers/historialMascota.controllers.js";
import { insertarInformacionMascota } from '../controllers/historialMascota.controllers.js';

const router = express.Router();

router.get("/historial-mascotas", MostrarHistorialMascota);

router.post('/actualizar-mascota', actualizarInformacionMascota);

router.post('/insertar-mascota', insertarInformacionMascota);
export default router;

