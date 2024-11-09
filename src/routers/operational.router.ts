import { FastifyInstance } from "fastify";

import { getServerInfo } from "../controllers/operational.controller";

async function operationalRouter(app: FastifyInstance) {

  app.route({
    method: "GET",
    url: "/",
    schema: {},
    handler: getServerInfo,
  });

}

export { operationalRouter };
