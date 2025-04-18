export class CustomError extends Error {
  code: number;
  source: string;
  name: string;
  context: any;

  constructor(name: string, code: number, message: string, context?: any, options?: ErrorOptions) {
    super(message, options);
    this.name = name;
    this.code = code;
    this.source = 'fullstack_app';
    this.context = context;
    // Maintains proper stack trace (only available in V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    } else {
      // Manually create the stack trace for non-V8 engines
      this.stack = new Error(message).stack;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      code: this.code,
      source: this.source,
      context: this.context,
    };
  }
}
