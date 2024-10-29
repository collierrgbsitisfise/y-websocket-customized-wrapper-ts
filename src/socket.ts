import type { WebSocket } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { SocketConnectionQuery, SocketConnectionUrlParams } from "./schemas/sockt.schema";
import { getUserDataFromJwtWithSignatureVerefication } from "./lib/auth";
import { webSocketMonitor } from "./services/webSocketMonitoring.service";

// @ts-ignore
import { setupWSConnection } from "./../websocket/bin/utils.cjs";

export function handleSocketConnection(socket:  WebSocket, request: FastifyRequest<{ Querystring: SocketConnectionQuery; Params: SocketConnectionUrlParams }>) {
  const { additionalData = '{}' } = request.query;
  const tokenFromCookie = request.cookies?.accessToken;
  const tokenFromQuery = request.query.token;
  const token = tokenFromCookie || tokenFromQuery || '';
  const docName = request.params.docId;

  const user = getUserDataFromJwtWithSignatureVerefication(token);

  if (!user) {
    socket.close(1008, 'Unauthorized');
    return;
  }

  setupWSConnection(socket, request.raw, {
    docName,
    uniqueClientIdentifier: user.userId,
    additionalData: getAdditionalDataWithFallBack(additionalData),
  });

  webSocketMonitor.addConnection(docName, socket, {
    userId: user.userId,
    additionalData: getAdditionalDataWithFallBack(additionalData),
    connectionTime: new Date()
  });
  
  socket.on('close', () => {
    webSocketMonitor.removeConnection(docName, socket);
    console.log('WebSocket connection closed:', user);
  });
}

function getAdditionalDataWithFallBack(stringifiedData: string, fallBack = {}): Record<string, unknown> {
  try {
    return JSON.parse(stringifiedData);
  } catch (err) {
    console.error(err);
    return fallBack;
  }
}