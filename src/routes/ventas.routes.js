import { Router } from "express";
import {consultar_ventas, consultar_cod_venta, crear_venta, eliminar_venta, actualizar_venta} from '../operaciones_ventas.js' 
const router = Router() 


router.get('/ventas', (req, res) => {
    consultar_ventas((err, results) => {
    if (err) {
      console.error('Error al consultar las ventas:', err);
      res.status(500).json({ error: 'Error interno de servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/ventas/:codigo', (req, res) => {
    const { codigo } = req.params;
    consultar_cod_venta(codigo, (err, results) => {
      if (err) {
        console.error('Error al consultar las ventas:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Venta no encontrada' });
      } else {
        res.json(results);
      }
    });
  });

  router.post('/ventas', (req, res) => {
    const data = req.body;
    crear_venta(data, (err, result) => {
      if (err) {
        console.error('Error al crear la venta:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });


  router.patch('/ventas/:codigo', (req, res) => {
    const { codigo } = req.params;
    const data = req.body;
    actualizar_venta(codigo, data, (err, result) => {
      if (err) {
        console.error('Error al actualizar la venta:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });

  router.delete('/ventas/:codigo', (req, res) => {
    const { codigo } = req.params;
    eliminar_venta(codigo, (err, result) => {
      if (err) {
        console.error('Error al eliminar la venta:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
        return;
      }
      res.json(result);
    });
  });

export default router