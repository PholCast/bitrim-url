import express from 'express';
import urlRoutes from './routes/url-routes.js';
import {getUrl} from './controllers/url-controller.js';
import cors from 'cors';
const app = express();
import { corsOptions } from './config/cors.js';


// Middlewares
app.use(cors(corsOptions)); //Es mejor aplicar CORS antes de los demás middlewares.
app.use(express.json());
app.use('/api/v1/urls', urlRoutes);

// app.get('/', (req, res) => {
//     res.status(400).json({ errorMessage: 'Empty code' });
// });

app.get('/:short_code', getUrl);

export default app;

