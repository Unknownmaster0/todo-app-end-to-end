import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3000;

// cors policy
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://d366zbfwim2g3t.cloudfront.net'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors()); // Allow preflight requests for all routes

// Add this line to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
import mainRouter from './routes/main.route';
app.use('/api/v1', mainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
