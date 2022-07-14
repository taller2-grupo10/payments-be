const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const axios = require("axios");

const fastify = require("fastify")({ logger: true });

async function isTokenValid(token) {
  const urlValidator = process.env.VALIDATION_URL + token;
  try {
    const response = await axios.get(urlValidator);
    return response.status === 200;
  } catch (err) {
    return false;
  }
}

fastify.addHook("onRequest", async (request, reply) => {
  if (request.url.includes("/doc")) {
    reply.code(200);
    return;
  }
  let key = request.headers.api_payments;
  if (!key) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
  if (!(await isTokenValid(key))) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
});

const registerRoutes = async () => {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/doc",
    swagger: {
      info: {
        title: "Spotifiuby Payments BE",
        description: "Documentation of Spotifiuby Payments BE",
        version: "0.1.0",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    exposeRoute: true,
    apis: ["routes.js"],
  });
  // Declares routes
  routes.forEach(route => fastify.route(route({ config, services })));
};

// Run the server
const start = async () => {
  try {
    await registerRoutes();
    await fastify.listen(config.PORT, config.HOST);
    fastify.ready(err => {
      if (err) throw err;
      fastify.swagger({ exposeRoute: true, route: "/doc", routePrefix: "/doc" });
    });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
