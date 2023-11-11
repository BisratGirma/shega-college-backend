import { type Express } from "express";
import authRoutes from "./routes/*.routes";

export default function initRoutes(app: Express): void {
  app.use("/*", authRoutes);
}
