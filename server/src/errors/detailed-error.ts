import { CustomError } from './custom-error';

export class DetailedError extends CustomError {
  statusCode = 500;
  private details: string;

  constructor(message: string, details: string) {
    super(message);
    this.details = details;

    Object.setPrototypeOf(this, DetailedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, details: this.details }];
  }
}