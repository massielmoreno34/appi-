import express from "express";
import { DetalleReserva } from "../controllers/DetalleReserva.controllers.js";
import { actualizarInformacionReserva } from '../controllers/DetalleReserva.controllers.js';
import { insertarInformacionReserva} from '../controllers/DetalleReserva.controllers.js';



const router = express.Router();

router.get("/detalle-reservas", DetalleReserva);
router.post('/actualizar-reserva', actualizarInformacionReserva);
router.post('/insertar-reserva', insertarInformacionReserva);



export default router;
