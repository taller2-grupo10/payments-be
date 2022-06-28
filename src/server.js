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
  bearer_token = request.headers.authorization;
  if (!bearer_token) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }

  without_bearer = bearer_token.split(" ");
  token = without_bearer[1];
  if (!(await isTokenValid(token))) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
});

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(config.PORT, config.HOST);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
