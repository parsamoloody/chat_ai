import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/chatRoutes.js';
import logger from './utils/logger.js';

env.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
