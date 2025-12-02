import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3, "O título precisa ter impacto (min 3 chars)"),
  slug: z.string().min(3, "Slug necessário para URL").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug deve ser kebab-case"),
  description: z.string().min(10, "Descrição curta demais para o SEO"),
  imageUrl: z.string().url("URL da imagem inválida"),
  tags: z.array(z.string()).min(1, "Adicione pelo menos uma tecnologia"),
  category: z.string(),
  link: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

export type TCreateProjectInput = z.infer<typeof createProjectSchema>;
export type TUpdateProjectInput = z.infer<typeof updateProjectSchema>;