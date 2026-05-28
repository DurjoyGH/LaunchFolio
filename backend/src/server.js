require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { startGenerationWorker } = require("./queues/generation.queue");

const PORT = process.env.PORT || 8000;

const start = async () => {
  await connectDB();
  startGenerationWorker();
  app.listen(PORT, () => {
    console.log(`🚀 LaunchFolio API running on port ${PORT}`);
  });
};

start();
