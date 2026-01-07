import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

// Define strict types matching the provided schema
export const analysisRequestSchema = z.object({
  text: z.string().min(50, "Text must be at least 50 characters"),
  environment: z.enum(["Calm", "Stressed", "Overwhelmed"]),
});

export const analysisResponseSchema = z.object({
  riskLevel: z.enum(["Low", "Medium", "High"]),
  risks: z.array(z.string()),
  warning: z.string(),
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;

// Types for History
export interface AnalysisHistoryItem extends AnalysisResponse {
  id: string;
  date: string;
  preview: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://neurosafe-backend.onrender.com";

export function useAnalyzeAgreement() {
  return useMutation({
    mutationFn: async (data: AnalysisRequest) => {
      // Validate input before sending
      const validatedInput = analysisRequestSchema.parse(data);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedInput),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Analysis failed");
      }

      const json = await response.json();
      
      // Validate response
      return analysisResponseSchema.parse(json);
    },
    onSuccess: (data, variables) => {
      // Save to local history
      const historyKey = "neurosafe_history";
      const existingHistoryJson = localStorage.getItem(historyKey);
      const existingHistory: AnalysisHistoryItem[] = existingHistoryJson 
        ? JSON.parse(existingHistoryJson) 
        : [];

      const newItem: AnalysisHistoryItem = {
        ...data,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        preview: variables.text.substring(0, 60) + "...",
      };

      const newHistory = [newItem, ...existingHistory];
      localStorage.setItem(historyKey, JSON.stringify(newHistory));
    },
  });
}

export function useAnalysisHistory() {
  const historyKey = "neurosafe_history";
  const existingHistoryJson = localStorage.getItem(historyKey);
  const history: AnalysisHistoryItem[] = existingHistoryJson 
    ? JSON.parse(existingHistoryJson) 
    : [];
  
  return history;
}
