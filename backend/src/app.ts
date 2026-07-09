import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories";
import toolsRouter from "./routes/tools";
import newsRouter from "./routes/news";
import projectsRouter from "./routes/projects";

const app = express();

// CORS: origin from env CORS_ORIGIN, default to "*" for dev
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));

// JSON body parser
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    data: { status: "ok", timestamp: new Date().toISOString() },
  });
});

// Routes
app.use("/api/categories", categoriesRouter);
app.use("/api/tools", toolsRouter);
app.use("/api/news", newsRouter);
app.use("/api/projects", projectsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ data: null, message: "Not found" });
});

// Error handler
app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ data: null, message: "Internal server error" });
  },
);

export default app;
