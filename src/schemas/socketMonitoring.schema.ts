import { Static, Type } from "@sinclair/typebox";

export const getActiveRoomInfoByDocIdUrlParamsSchema = Type.Object({
  docId: Type.String(),
});

export type GetActiveRoomInfoByDocIdUrlParams = Static<
  typeof getActiveRoomInfoByDocIdUrlParamsSchema
>;
