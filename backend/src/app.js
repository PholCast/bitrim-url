import express from 'express';
import urlRoutes from './routes/url-routes.js';
const app = express();

// Middlewares
app.use(express.json());

app.use('/api/v1/urls', urlRoutes);

export default app;

