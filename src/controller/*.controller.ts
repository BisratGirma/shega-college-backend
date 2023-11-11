import { Request, Response } from "express";

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "* services running" });
  return;
}

export default {
  healthCheck,
};
