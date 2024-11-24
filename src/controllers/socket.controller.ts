import type { WebSocket } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

import { getUserDataFromJwtWithSignatureVerification } from "./../lib/auth";
import {
  SocketConnectionQuery,
  SocketConnectionUrlParams,
} from "./../schemas/socket.schema";
import { socketMonitor } from "./../services/socketMonitoring.service";
// @ts-expect-error - no types available
import { setupWSConnection } from "./../websocket/bin/utils.cjs";

export function handleSocketConnection(
  socket: WebSocket,
  request: FastifyRequest<{
    Querystring: SocketConnectionQuery;
    Params: SocketConnectionUrlParams;
  }>,
) {
  const { additionalData = "{}" } = request.query;
  const tokenFromCookie = request.cookies?.accessToken;
  const tokenFromQuery = request.query.token;
  const token = tokenFromCookie || tokenFromQuery || "";
  const docName = request.params.docId;

  const user = getUserDataFromJwtWithSignatureVerification(token);

  if (!user) {
    socket.close(1008, "Unauthorized");
    return;
  }

  const additionalDataByFallback =
    getAdditionalDataWithFallBack(additionalData);

  setupWSConnection(socket, request.raw, {
    docName,
    uniqueClientIdentifier: user.userId,
    additionalData: additionalDataByFallback,
  });

  socketMonitor.addConnection(docName, socket, {
    userId: user.userId,
    additionalData: additionalDataByFallback,
    connectionTime: new Date(),
  });

  socket.on("close", () => {
    socketMonitor.removeConnection(docName, socket);
    console.log("WebSocket connection closed:", user);
  });
}

function getAdditionalDataWithFallBack(
  stringifiedData: string,
  fallBack = {},
): Record<string, unknown> {
  try {
    return JSON.parse(stringifiedData);
  } catch (err) {
    console.error(err);
    return fallBack;
  }
}
