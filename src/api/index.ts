import { type Express } from "express";
import courseRoutes from "./routes/course.routes";

export default function initRoutes(app: Express): void {
  app.use("/course", courseRoutes);
}
