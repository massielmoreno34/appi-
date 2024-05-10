import { getConnection } from "../database/connection.js";

export const MostrarInfoProducto = async (req, res) => {
  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para obtener la información del producto
    const result = await pool
      .request()
      .query(`
        SELECT p.id_Producto, 
               p.nombre, 
               p.descripcion, 
               s.tipo_servicio AS Tipo_Producto, 
               p.marca, 
               p.precio, 
               p.cantidad
        FROM producto p
        LEFT JOIN producto_servicio ps ON p.id_Producto = ps.id_Producto
        LEFT JOIN servicio s ON ps.id_servicio = s.id_servicio
      `);

    // Devolver los resultados
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }

};

export const actualizarInformacionProducto = async (req, res) => {
  try {
    const { id_Producto, nuevo_nombre, nueva_descripcion, nueva_marca, nueva_cantidad, nuevo_precio } = req.body;

    if (!id_Producto || !nuevo_nombre || !nueva_descripcion || !nueva_marca || !nueva_cantidad || !nuevo_precio) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para actualizar la información del producto
    await pool
      .request()
      .input('id_Producto', id_Producto)
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_descripcion', nueva_descripcion)
      .input('nueva_marca', nueva_marca)
      .input('nueva_cantidad', nueva_cantidad)
      .input('nuevo_precio', nuevo_precio)
      .execute('ActualizarInformacionProducto');

    // Devolver mensaje de éxito
    res.json({ message: "La información del producto ha sido actualizada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const insertarInformacionProducto = async (req, res) => {
  try {
    const { nuevo_nombre, nueva_descripcion, nueva_marca, nueva_cantidad, nuevo_precio } = req.body;

    if (!nuevo_nombre || !nueva_descripcion || !nueva_marca || !nueva_cantidad || !nuevo_precio) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para insertar nueva información del producto
    await pool
      .request()
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_descripcion', nueva_descripcion)
      .input('nueva_marca', nueva_marca)
      .input('nueva_cantidad', nueva_cantidad)
      .input('nuevo_precio', nuevo_precio)
      .execute('InsertarInformacionProducto');

    // Devolver mensaje de éxito
    res.json({ message: "La nueva información del producto ha sido insertada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
