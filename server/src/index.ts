import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import redis from "./lib/redis";
import { prisma } from "./lib/prisma";
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend running with TypeScript", mode: config.nodeEnv });
});

app.get("/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    await redis.ping();
    res.json({ status: "ok", database: "connected", redis: "connected", mode: config.nodeEnv });
  } catch (error) {
    res.status(500).json({ status: "error", message: (error as Error).message });
  }
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} in ${config.nodeEnv} mode`);
});