import { getConnection } from "../database/connection.js";

export const MostrarHistorialMascota = async (req, res) => {
  try {
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para obtener el historial de mascotas
    const result = await pool
      .request()
      .query(`
        SELECT 
            p.cedula AS 'Cédula',
            p.nombre_propietario AS 'Nombre Propietario',
            p.telefono AS 'Teléfono',
            p.direccion AS 'Dirección',
            m.id_mascota AS 'ID Mascota',
            m.nombre_mascota AS 'Nombre Mascota',
            m.fecha_nacimiento AS 'Fecha de Nacimiento',
            m.especie AS 'Especie',
            m.sexo AS 'Sexo'
        FROM 
            propietario p
        INNER JOIN 
            mascota m ON p.id_propietario = m.id_propietario
        LEFT JOIN 
            reserva r ON p.id_propietario = r.id_propietario
        LEFT JOIN 
            cita c ON r.id_reserva = c.id_reserva
        ORDER BY 
            p.nombre_propietario, m.nombre_mascota;
      `);

    // Devolver los resultados
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const actualizarInformacionMascota = async (req, res) => {
  try {
    const { id_mascota, nuevo_nombre, nueva_especie, nueva_raza, nuevo_sexo } = req.body;

    if (!id_mascota || !nombre || !nueva_especie || !nueva_raza || !nuevo_sexo) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para actualizar la información de la mascota
    await pool
      .request()
      .input('id_mascota', id_mascota)
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_especie', nueva_especie)
      .input('nueva_raza', nueva_raza)
      .input('nuevo_sexo', nuevo_sexo)
      .execute('ActualizarInformacionMascota');

    // Devolver mensaje de éxito
    res.json({ message: "La información de la mascota ha sido actualizada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const insertarInformacionMascota = async (req, res) => {
  try {
    const { nuevo_nombre, nueva_especie, nueva_raza, nuevo_sexo } = req.body;

    if (!nuevo_nombre || !nueva_especie || !nueva_raza || !nuevo_sexo) {
      return res.status(400).json({ message: "Se requieren todos los campos." });
    }

    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado para insertar nueva información de la mascota
    await pool
      .request()
      .input('nuevo_nombre', nuevo_nombre)
      .input('nueva_especie', nueva_especie)
      .input('nueva_raza', nueva_raza)
      .input('nuevo_sexo', nuevo_sexo)
      .execute('InsertarInformacionMascota');

    // Devolver mensaje de éxito
    res.json({ message: "La nueva información de la mascota ha sido insertada correctamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
