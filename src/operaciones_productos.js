import {db} from './db.js'

function consultar_productos(callback) {
  db.query('SELECT * FROM Productos', (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

function consultar_cod_pro(codigo, callback) {
  db.query('SELECT * FROM Productos WHERE Codigo = ?', [codigo], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
}

function crear_producto({ Nombre, Descripcion, Precio, Cantidad }, callback) {

  db.query(
    'INSERT INTO Productos (Nombre, Descripcion, Precio, Cantidad) VALUES (?, ?, ?, ?)',
    [Nombre, Descripcion, Precio, Cantidad],
    (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { message: 'Creación exitosa', codigo: results.insertId });
    }
  );
}

function eliminar_producto(codigo, callback){
    db.query('DELETE FROM Productos WHERE Codigo = ?', [codigo], (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (results.affectedRows === 0) {
          callback(null, { message: 'Este producto no existe' });
        } else {
          callback(null, { message: 'Producto eliminado exitosamente' });
        }
      });
}

function actualizar_producto(codigo, { Nombre, Descripcion, Precio, Cantidad }, callback) {
    db.query(
      'UPDATE Productos SET Nombre =IFNULL(?,Nombre), Descripcion =IFNULL(?,Descripcion), Precio = IFNULL(?,Precio), Cantidad = IFNULL(?,Cantidad) WHERE Codigo = ?',
      [Nombre, Descripcion, Precio, Cantidad, codigo],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, { message: 'Producto actualizado exitosamente' });
      }
    );
  }



  export { consultar_productos, consultar_cod_pro, crear_producto, eliminar_producto, actualizar_producto };
  



