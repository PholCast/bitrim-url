import express from 'express';
import urlRoutes from './routes/url-routes.js';
import {getUrl} from './controllers/url-controller.js'
const app = express();

// Middlewares
app.use(express.json());
app.use('/api/v1/urls', urlRoutes);

app.get('/:short_code', getUrl);

export default app;

