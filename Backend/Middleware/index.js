import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3001'],
    credentials: true
}));
app.use(morgan('tiny'));
app.use(compression());
const port = 5050;
//micro services
app.use('/authentication', createProxyMiddleware({ target: process.env.Authentication, changeOrigin: true }));
app.listen(port, () => console.log(`Middleware api listening on port ${port}!`));