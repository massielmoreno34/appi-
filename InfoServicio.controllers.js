import { getConnection } from "../database/connection.js";

export const MostrarInfoServicio = async (req, res) => {
  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para obtener la información del servicio
    const result = await pool
      .request()
      .query(`
        SELECT cs.id_servicio, 
               s.tipo_servicio, 
               s.descripcion, 
               p.precio, 
               CONCAT(p.nombre, ', ', p.descripcion) AS Productos
        FROM cita_servicio cs
        INNER JOIN servicio s ON cs.id_servicio = s.id_servicio
        INNER JOIN producto_servicio ps ON cs.id_servicio = ps.id_servicio
        INNER JOIN producto p ON ps.id_Producto = p.id_Producto
      `);

    // Devolver los resultados
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const actualizarInformacionServicio = async (req, res) => {
  try {
    const { id_servicio, nuevo_tipo_servicio, nueva_descripcion } = req.body;

    if (!id_servicio || !nuevo_tipo_servicio || !nueva_descripcion) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para actualizar la información del servicio
    await pool
      .request()
      .input('id_servicio', id_servicio)
      .input('nuevo_tipo_servicio', nuevo_tipo_servicio)
      .input('nueva_descripcion', nueva_descripcion)
      .execute('ActualizarInformacionServicio');

    // Devolver mensaje de éxito
    res.json({ message: "La información del servicio ha sido actualizada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const insertarInformacionServicio = async (req, res) => {
  try {
    const { nuevo_tipo_servicio, nueva_descripcion } = req.body;

    if (!nuevo_tipo_servicio || !nueva_descripcion) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para insertar nueva información del servicio
    await pool
      .request()
      .input('nuevo_tipo_servicio', nuevo_tipo_servicio)
      .input('nueva_descripcion', nueva_descripcion)
      .execute('InsertarInformacionServicio');

    // Devolver mensaje de éxito
    res.json({ message: "La nueva información del servicio ha sido insertada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
