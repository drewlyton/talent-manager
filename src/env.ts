import { z } from "zod";

const envSchema = z.object({
  GITHUB_TOKEN: z.string().nonempty(),
  GITHUB_REPO_OWNER: z.string().nonempty(),
  GITHUB_REPO_NAME: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
