import express from "express";
import cors from "cors";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configuration
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN?.split(",") || "http://10.0.2.2:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import router
import healthCheckRouter from "./routes/healthcheck.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/products.route.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

export default app;
