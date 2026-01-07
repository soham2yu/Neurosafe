import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  // External API definition for type reference
  analyze: {
    method: 'POST' as const,
    path: '/analyze',
    input: z.object({
      text: z.string(),
      environment: z.string()
    }),
    responses: {
      200: z.object({
        riskLevel: z.string(),
        risks: z.array(z.string()),
        warning: z.string()
      })
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
