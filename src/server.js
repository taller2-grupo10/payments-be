const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
const start = async () => {
  try {
    if (config.LOCAL_HOST) {
      await fastify.listen(config.PORT, config.LOCAL_HOST);
    } else {
      await fastify.listen(config.PORT);
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
