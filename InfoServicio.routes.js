import { Router } from "express";
import { MostrarInfoServicio } from "../controllers/InfoServicio.controllers.js";
import { actualizarInformacionServicio } from '../controllers/InfoServicio.controllers.js';
import { insertarInformacionServicio } from '../controllers/InfoServicio.controllers.js';

const router = Router();

router.get("/servicios", MostrarInfoServicio);
router.post('/actualizar-servicio', actualizarInformacionServicio);
router.post('/insertar-servicio', insertarInformacionServicio);

export default router;

