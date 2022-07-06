const config = require("../src/config");
const services = require("../src/services/services")({ config });
const routes = require("../src/routes");
const axios = require("axios");

const fastify = require("fastify")({ logger: true });
config.contractAddress = "0xdedbf2988042308753802f20da5ACA000841Ed2a";

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
fastify.listen(config.PORT, config.HOST);
