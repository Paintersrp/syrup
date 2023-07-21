import pino from 'pino';

const fileTransport = pino.transport({
  target: 'pino/file',

  options: { destination: `./logs/app.log` },
});

const consoleTransport = pino.transport({
  target: 'pino-pretty',
});

export const logger = pino(
  {
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    serializers: pino.stdSerializers,
  },
  pino.multistream([fileTransport, consoleTransport])
);
