import env from 'dotenv'
import express from 'express'
const app = express();
import router from './routes/chatRoutes.js'
import logger from './utils/logger.js';
env.config()

app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
