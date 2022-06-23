import express from 'express';
import routes from './routes/routes';

const app = express();
const PORT = 3000;

app.use('/api', routes);

app.get('/', (req, res): void => {
  res.send('Welcome to image processing API');
});

app.listen(PORT, (): void => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
