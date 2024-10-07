import { Static, Type } from "@sinclair/typebox";

export const socketConnectionUrlParamsSchema = Type.Object({
  docId: Type.String(),
});

export type SocketConnectionUrlParams = Static<
  typeof socketConnectionUrlParamsSchema
>;

export const socketConnectionQuerySchema = Type.Object({
  token: Type.String(),
});

export type SocketConnectionQuery = Static<
  typeof socketConnectionQuerySchema
>;
