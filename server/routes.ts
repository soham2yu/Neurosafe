import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // This server primarily serves the frontend. 
  // API calls from the frontend go to the external backend (VITE_API_BASE_URL).
  return httpServer;
}
