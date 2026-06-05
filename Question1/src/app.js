import express from "express";
import schedulingRoutes from "./routes/scheduling.js";

const app = express();

app.use(express.json());

app.use("/schedule", schedulingRoutes);

export default app;