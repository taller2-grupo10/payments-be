function schema() {
  return {
    params: {},
  };
}

function handler({}) {
  return async function (req, reply) {
    const body = "Hello World!";
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
