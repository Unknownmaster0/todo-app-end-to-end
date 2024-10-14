interface constrctProps {
  statusCode: number;
  message: string;
  stack: string;
  errors: string[];
}
class ApiError extends Error {
  statusCode: number;
  errors: string[];
  data: any;
  success: boolean;

  constructor(constructProps: constrctProps) {
    super(constructProps.message);
    this.statusCode = constructProps.statusCode;
    this.errors = constructProps.errors;
    this.message = constructProps.message;
    this.data = null;
    this.success = false;

    if (constructProps.stack) {
      this.stack = constructProps.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
