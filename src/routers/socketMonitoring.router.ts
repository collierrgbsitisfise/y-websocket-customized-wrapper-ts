import { FastifyInstance } from "fastify";

import {
  getAllRooms,
  getRoomInfoByDocId,
} from "../controllers/socketMonitoring.controller";
import { getActiveRoomInfoByDocIdUrlParamsSchema } from "../schemas/webSocketMonitoring.schema";

async function socketMonitoringRouter(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/list",
    schema: {},
    handler: getAllRooms,
  });

  app.route({
    method: "GET",
    url: "/:docId",
    schema: {
      params: getActiveRoomInfoByDocIdUrlParamsSchema,
    },
    handler: getRoomInfoByDocId,
  });
}

export { socketMonitoringRouter };
