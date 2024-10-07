import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

import envVariables from "./lib/envVariables";

const schema = Type.Object({
  // SERVER
  PORT: Type.Number({ default: 3000 }),
  ADDRESS: Type.String({ default: "0.0.0.0" }),
  ENV: Type.String({ default: "development" }),

  // AUTH
  JWT_SECRET: Type.String(),

  // Y-PROTOCOL
  YPERSISTENCE: Type.Optional(Type.String()),
});

export type EnvVariablesSchemaType = Static<typeof schema>;

export const config = envSchema<EnvVariablesSchemaType>({
  data: envVariables.parsed,
  schema,
});
