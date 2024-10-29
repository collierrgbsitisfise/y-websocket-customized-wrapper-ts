import { FastifyReply, FastifyRequest } from "fastify";
import { GetActiveRoomInfoByDocIdUrlParams } from "../schemas/webSocketMonitoring.schema";
import { webSocketMonitor } from "../services/webSocketMonitoring.service";

export async function getRoomInfoByDocId(
  request: FastifyRequest<{ Params: GetActiveRoomInfoByDocIdUrlParams }>,
  reply: FastifyReply,
) {
  const { docId } = request.params;

  const roomInfo = webSocketMonitor.getRoomInfo(docId);
  
  if (!roomInfo) {
    reply.code(404).send({
      error: 'Room not found'
    });
    return;
  }
  
  return roomInfo;
}

export async function getAllRooms(
  _request: FastifyRequest,
  _reply: FastifyReply,
) {
  return webSocketMonitor.getRooms();
}
