import { pinoHttp } from "pino-http";
import pino from "pino";

export const logger = pino({
    level: "info",
    base: {
        serviceName: "catalog_service"
    },
    serializers: pino.stdSerializers,
    timestamp: () => `,"time" : "${new Date(Date.now()),toString()}"`,
    transport: {
        target: "pino-pretty",
        level: "error",
    }

})

export const httpLogger = pinoHttp({
    level: "error",
    logger,
})