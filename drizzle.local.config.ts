import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle-local-migrations",
  schema: "./**/**/db/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
  },
  casing: "snake_case",
});
