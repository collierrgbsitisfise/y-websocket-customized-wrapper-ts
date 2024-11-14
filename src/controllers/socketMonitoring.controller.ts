import { FastifyRequest } from "fastify";
import { BadRequest } from "http-errors";

import { GetActiveRoomInfoByDocIdUrlParams } from "../schemas/webSocketMonitoring.schema";
import { socketMonitor } from "../services/socketMonitoring.service";

export async function getRoomInfoByDocId(
  request: FastifyRequest<{ Params: GetActiveRoomInfoByDocIdUrlParams }>,
) {
  const { docId } = request.params;

  const roomInfo = socketMonitor.getRoomInfo(docId);

  if (!roomInfo) {
    throw new BadRequest("Room not found");
  }

  return roomInfo;
}

export async function getAllRooms() {
  return socketMonitor.getRooms();
}
