import { logger } from '../settings';

export interface ErrorResponse {
  status: number;
  message: string;
  details?: any;
  errorCode?: string;
}

/**
 * Enum representing standard error codes.
 */
export enum ErrorCodes {
  SERVER = 'SERVER_ERROR',
  CLIENT = 'CLIENT_ERROR',
  DB = 'DATABASE_ERROR',
}

/**
 * Base class for system errors.
 */
export abstract class SyError extends Error {
  public status: number;
  public message: string;
  public details?: any;
  public errorCode?: string;

  /**
   * @param status - HTTP status code of the error.
   * @param message - Human-readable message providing more details about the error.
   * @param details - Detailed information about the error.
   * @param errorCode - Specific error code representing the type of error.
   */
  constructor(status: number, message: string, details?: any, errorCode?: string) {
    super(message);

    this.status = status;
    this.message = message;
    this.details = details;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, SyError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Converts the error object into a standard error response format.
   * @returns An error response object.
   */
  public toResponse(): ErrorResponse {
    return {
      status: this.status,
      errorCode: this.errorCode,
      message: this.message,
      details: this.details,
    };
  }

  /**
   * Logs the error details for debugging and tracing.
   */
  public logError(): void {
    logger.error({
      status: this.status,
      code: this.errorCode,
      message: this.message,
      details: this.details,
      stack: this.stack,
    });
  }
}

/**
 * Class representing server errors.
 */
export class SyServerError extends SyError {
  /**
   * @param status - HTTP status code of the error.
   * @param message - Human-readable message providing more details about the error.
   * @param details - Detailed information about the error.
   */
  constructor(status: number, message: string, details?: any) {
    super(status, message, details, ErrorCodes.SERVER);
    Object.setPrototypeOf(this, SyServerError.prototype);
  }
}

/**
 * Class representing database errors.
 */
export class SyDatabaseError extends SyError {
  /**
   * @param status - HTTP status code of the error.
   * @param message - Human-readable message providing more details about the error.
   * @param details - Detailed information about the error.
   */
  constructor(status: number, message: string, details?: any) {
    super(status, message, details, ErrorCodes.DB);
    Object.setPrototypeOf(this, SyDatabaseError.prototype);
  }
}

/**
 * Class representing client errors.
 */
export class SyClientError extends SyError {
  /**
   * @param status - HTTP status code of the error.
   * @param message - Human-readable message providing more details about the error.
   * @param details - Detailed information about the error.
   */
  constructor(status: number, message: string, details?: any) {
    super(status, message, details, ErrorCodes.CLIENT);
    Object.setPrototypeOf(this, SyClientError.prototype);
  }
}
