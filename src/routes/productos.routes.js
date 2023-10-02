import { Router } from "express";
import {consultar_productos, consultar_cod_pro, crear_producto, eliminar_producto, actualizar_producto} from '../operaciones_productos.js' 
const router = Router() 


router.get('/productos', (req, res) => {
    consultar_productos((err, results) => {
    if (err) {
      console.error('Error al consultar los productos:', err);
      res.status(500).json({ error: 'Error interno de servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    consultar_cod_pro(codigo, (err, results) => {
      if (err) {
        console.error('Error al consultar producto:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(results);
      }
    });
  });

  router.post('/productos', (req, res) => {
    const data = req.body;
    crear_producto(data, (err, result) => {
      if (err) {
        console.error('Error al crear producto:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });


  router.patch('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    const data = req.body;
    actualizar_producto(codigo, data, (err, result) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });

  router.delete('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    eliminar_producto(codigo, (err, result) => {
      if (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });

export default router