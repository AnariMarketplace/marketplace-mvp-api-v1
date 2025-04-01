// import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./**/**/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.etxyzjizvpnycobqjqgk:mydbtestingDEV@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  },
  casing: "snake_case",
});
