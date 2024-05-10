import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import productosRoutes from './routes/productos.routes.js';
import DetalleReservaRoutes from './routes/DetalleReserva.routes.js';
import historialMascotaRoutes from './routes/historialMascota.routes.js';
import InfoServicio from './routes/infoServicio.routes.js';
import InfoPago from './routes/infoPago.routes.js';
import config from './config.js';

const app = express();

// Configuración
app.set('port', config.port);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/producto', productosRoutes);
app.use('/detalleReserva', DetalleReservaRoutes);
app.use('/historialMascota', historialMascotaRoutes);
app.use('/infoServicio', InfoServicio);
app.use('/infoPago', InfoPago);
export default app;


