import { getConnection } from "../database/connection.js";

export const DetalleReserva = async (req, res) => {
  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para obtener el detalle de reservas
    const result = await pool
      .request()
      .query(`
        SELECT 
            p.cedula AS 'Cédula',
            p.nombre_propietario AS 'Nombre Propietario',
            p.telefono AS 'Teléfono',
            p.direccion AS 'Dirección',
            m.nombre_mascota AS 'Nombre Mascota',
            c.fecha AS 'Fecha de Cita',
            c.hora AS 'Hora de Cita',
            pr.precio AS 'Precio del Producto',
            s.tipo_servicio AS 'Tipo de Servicio',
            s.descripcion AS 'Descripción del Servicio'
        FROM 
            propietario p
        INNER JOIN 
            reserva r ON p.id_propietario = r.id_propietario
        INNER JOIN 
            cita c ON r.id_reserva = c.id_reserva
        INNER JOIN 
            cita_servicio cs ON c.id_cita = cs.id_cita
        INNER JOIN 
            servicio s ON cs.id_servicio = s.id_servicio
        LEFT JOIN 
            mascota m ON m.id_propietario = p.id_propietario
        LEFT JOIN 
            producto_servicio ps ON ps.id_servicio = s.id_servicio
        LEFT JOIN 
            producto pr ON ps.id_producto = pr.id_producto
        ORDER BY 
            p.nombre_propietario, c.fecha, c.hora;
      `);

    // Devolver los resultados
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const actualizarInformacionReserva = async (req, res) => {
  try {
    const { id_reserva, nuevo_nombre, nueva_ubicacion, nuevo_id_propietario } = req.body;

    if (!id_reserva || !nuevo_nombre || !nueva_ubicacion || !nuevo_id_propietario) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para actualizar la información de la reserva
    await pool
      .request()
      .input('id_reserva', id_reserva)
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_ubicacion', nueva_ubicacion)
      .input('nuevo_id_propietario', nuevo_id_propietario)
      .execute('ActualizarInformacionReserva');

    // Devolver mensaje de éxito
    res.json({ message: "La información de la reserva ha sido actualizada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const insertarInformacionReserva = async (req, res) => {
  try {
    const { nuevo_nombre, nueva_ubicacion, nuevo_id_propietario } = req.body;

    if (!nuevo_nombre || !nueva_ubicacion || !nuevo_id_propietario) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para insertar nueva información de la reserva
    await pool
      .request()
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_ubicacion', nueva_ubicacion)
      .input('nuevo_id_propietario', nuevo_id_propietario)
      .execute('InsertarInformacionReserva');

    // Devolver mensaje de éxito
    res.json({ message: "La nueva información de la reserva ha sido insertada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

