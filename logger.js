const pino = require('pino');

// Pretty logger!
const logger = pino({
    transport: {
        target: "pino-pretty"
    }
});

module.exports = logger;