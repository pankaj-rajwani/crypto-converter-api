import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Router } from '../core/routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4200;
const apiVersion = process.env.API_VERSION || 'v1';

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Router.APP_ROUTER(app, apiVersion);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
