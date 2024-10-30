import { FastifyRequest } from "fastify";
import { BadRequest } from "http-errors";

import { GetActiveRoomInfoByDocIdUrlParams } from "../schemas/webSocketMonitoring.schema";
import { webSocketMonitor } from "../services/webSocketMonitoring.service";

export async function getRoomInfoByDocId(
  request: FastifyRequest<{ Params: GetActiveRoomInfoByDocIdUrlParams }>,
) {
  const { docId } = request.params;

  const roomInfo = webSocketMonitor.getRoomInfo(docId);
  
  if (!roomInfo) {
    throw new BadRequest('Room not found');
  }
  
  return roomInfo;
}

export async function getAllRooms() {
  return webSocketMonitor.getRooms();
}
