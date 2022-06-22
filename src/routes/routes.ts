import express from 'express';
import image from './api/image'

const routes = express.Router();

routes.use('/images', image)

routes.get('/', (req, res) => {
  res.send('Routing station');
});

export default routes;
