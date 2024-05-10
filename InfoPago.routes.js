import express from "express";
import { InformacionPago } from "../controllers/InfoPago.controllers.js";
import { actualizarInformacionPago } from '../controllers/InfoPago.controllers.js';
import { insertarInformacionPago } from '../controllers/InfoPago.controllers.js'; 

const router = express.Router();

router.get("/pagos", InformacionPago);
router.post('/actualizar-pago', actualizarInformacionPago);
router.post('/insertar-pago', insertarInformacionPago);



export default router;

