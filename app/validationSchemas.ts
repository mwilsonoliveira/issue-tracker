import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Título é obrigatório.").max(255),
  description: z.string().min(1, "Descrição é obrigatória."),
});
