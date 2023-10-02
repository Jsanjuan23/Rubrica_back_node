import productos from './routes/productos.routes.js'
import ventas from './routes/ventas.routes.js'
import express from 'express'


const app = express();
app.use(express.json());

app.use(productos)
app.use(ventas)
app.use((req, res, next)=>{
  res.status(404).json({
    message: 'Endpoint not found'
  })
})
export default app
