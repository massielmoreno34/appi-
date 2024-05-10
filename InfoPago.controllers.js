import { getConnection } from "../database/connection.js";

export const InformacionPago = async (req, res) => {
  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para obtener la información de pago
    const result = await pool
      .request()
      .query(`
        SELECT 
            pr.cedula AS 'Cedula Propietario',
            pr.nombre_propietario AS 'Nombre Propietario',
            ci.fecha AS 'Fecha de Cita',
            ci.hora AS 'Hora de Cita',
            se.tipo_servicio AS 'Tipo de Servicio',
            se.descripcion AS 'Descripción del Servicio',
            pa.forma_pago AS 'Forma de Pago',
            pa.descuento AS 'Descuento',
            (pa.monto - pa.descuento) AS 'Precio',
            pa.cantidad AS 'Pago'
        FROM 
            cita ci
        INNER JOIN 
            reserva re ON ci.id_reserva = re.id_reserva
        INNER JOIN 
            propietario pr ON re.id_propietario = pr.id_propietario
        INNER JOIN 
            pago pa ON ci.id_pago = pa.id_pago
        INNER JOIN 
            cita_servicio cs ON ci.id_cita = cs.id_cita
        INNER JOIN 
            servicio se ON cs.id_servicio = se.id_servicio
        INNER JOIN 
            producto_servicio ps ON se.id_servicio = ps.id_servicio
      `);

    // Devolver los resultados
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const actualizarInformacionPago = async (req, res) => {
  try {
    const { id_pago, nueva_fecha, nuevo_monto, nueva_cantidad, nuevo_descuento, nueva_forma_pago } = req.body;

    if (!id_pago || !nueva_fecha || !nuevo_monto || !nueva_cantidad || !nuevo_descuento || !nueva_forma_pago) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para actualizar la información del pago
    await pool
      .request()
      .input('id_pago', id_pago)
      .input('nueva_fecha', nueva_fecha)
      .input('nuevo_monto', nuevo_monto)
      .input('nueva_cantidad', nueva_cantidad)
      .input('nuevo_descuento', nuevo_descuento)
      .input('nueva_forma_pago', nueva_forma_pago)
      .execute('ActualizarInformacionPago');

    // Devolver mensaje de éxito
    res.json({ message: "La información del pago ha sido actualizada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const insertarInformacionPago = async (req, res) => {
  try {
    const { nueva_fecha, nuevo_monto, nueva_cantidad, nuevo_descuento, nueva_forma_pago } = req.body;

    if (!nueva_fecha || !nuevo_monto || !nueva_cantidad || !nuevo_descuento || !nueva_forma_pago) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para insertar nueva información del pago
    await pool
      .request()
      .input('nueva_fecha', nueva_fecha)
      .input('nuevo_monto', nuevo_monto)
      .input('nueva_cantidad', nueva_cantidad)
      .input('nuevo_descuento', nuevo_descuento)
      .input('nueva_forma_pago', nueva_forma_pago)
      .execute('InsertarInformacionPago');

    // Devolver mensaje de éxito
    res.json({ message: "La nueva información del pago ha sido insertada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
