import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for the fake auth types
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  role: text("role").notNull(), // Student, Freelancer, Founder
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  role: true,
});

// Schemas for the Analysis feature
export const analysisRequestSchema = z.object({
  text: z.string().min(50, "Text must be at least 50 characters"),
  environment: z.enum(["Calm", "Stressed", "Overwhelmed"]),
});

export const analysisResponseSchema = z.object({
  riskLevel: z.enum(["Low", "Medium", "High"]),
  risks: z.array(z.string()),
  warning: z.string(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
