import {Router} from 'express'
import { MostrarInfoProducto } from "../controllers/productos.controllers.js";
import { actualizarInformacionProducto } from '../controllers/productos.controllers.js';
import {insertarInformacionProducto} from '../controllers/productos.controllers.js';
const router = Router ()

router.get("/productos", MostrarInfoProducto);
router.post('/actualizar-producto', actualizarInformacionProducto);
router.post('/insertar-producto', insertarInformacionProducto);


export default router 








