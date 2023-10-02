import {db} from './db.js'

function consultar_ventas(callback) {
  db.query('SELECT * FROM Ventas', (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

function consultar_cod_venta(codigo, callback) {
  db.query('SELECT * FROM Ventas WHERE Codigo = ?', [codigo], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
}

function crear_venta({ Codigo_producto, Nom_cliente, Tel_cliente, Fecha_venta, Cant_vendida, Total_venta }, callback) {
  db.query(
    'INSERT INTO Ventas (Codigo_producto, Nom_cliente, Tel_cliente, Fecha_venta, Cant_vendida, Total_venta) VALUES (?, ?, ?, ?, ?, ?)',
    [Codigo_producto, Nom_cliente, Tel_cliente, Fecha_venta, Cant_vendida, Total_venta],
    (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { message: 'Creación exitosa', codigo: results.insertId });
    }
  );
}

function eliminar_venta(codigo, callback){
    db.query('DELETE FROM Ventas WHERE Codigo = ?', [codigo], (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (results.affectedRows === 0) {
          callback(null, { message: 'Esta venta no existe' });
        } else {
          callback(null, { message: 'Venta eliminada exitosamente' });
        }
      });
}

function actualizar_venta(codigo, { Codigo_producto, Nom_cliente, Tel_cliente, Fecha_venta, Cant_vendida, Total_venta }, callback) {
    db.query(
      'UPDATE Ventas SET Codigo_producto =IFNULL(?,Codigo_producto), Nom_cliente =IFNULL(?,Nom_cliente), Tel_cliente = IFNULL(?,Tel_cliente), Fecha_venta = IFNULL(?,Fecha_venta), Cant_vendida = IFNULL(?,Cant_vendida), Total_venta = IFNULL(?,Total_venta) WHERE Codigo = ?',
      [Codigo_producto, Nom_cliente, Tel_cliente, Fecha_venta, Cant_vendida, Total_venta,codigo],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, { message: 'Venta actualizada exitosamente' });
      }
    );
  }



  export { consultar_ventas, consultar_cod_venta, crear_venta, eliminar_venta, actualizar_venta };
  



