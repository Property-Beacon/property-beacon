import { createLogger } from '@redwoodjs/api/logger'

/**
 * Creates a logger with RedwoodLoggerOptions
 *
 * These extend and override default LoggerOptions,
 * can define a destination like a file or other supported pino log transport stream,
 * and sets whether or not to show the logger configuration settings (defaults to false)
 *
 * @param RedwoodLoggerOptions
 *
 * RedwoodLoggerOptions have
 * @param {options} LoggerOptions - defines how to log, such as pretty printing, redaction, and format
 * @param {string | DestinationStream} destination - defines where to log, such as a transport stream or file
 * @param {boolean} showConfig - whether to display logger configuration on initialization
 */
export const logger = createLogger({
  // TODO: Integrate with 3rd-party logger
  destination: process.env.LOG_API_DESTINATION,
  // We can extend to avoid logging sensitive data
  // https://redwoodjs.com/docs/logger.html#redaction
  // options: { redact: redactionsList }
  options: { level: 'info', prettyPrint: true }
})
