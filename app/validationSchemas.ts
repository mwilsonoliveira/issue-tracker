import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Título é obrigatório.").max(255),
  description: z.string().min(1, "Descrição é obrigatória.").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Título é obrigatório.").max(255).optional(),
  description: z
    .string()
    .min(1, "Descrição é obrigatória.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Id do usuário é obrigatório")
    .max(255)
    .optional()
    .nullable(),
});
