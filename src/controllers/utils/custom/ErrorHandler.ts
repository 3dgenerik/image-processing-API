import { ICustomError } from '../../../constants';

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  formatError(): ICustomError {
    return {
      error: {
        statusCode: this.statusCode,
        message: this.message,
      },
    };
  }
}
