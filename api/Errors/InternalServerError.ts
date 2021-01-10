import ExtendableError from './ExtendableError';

// 500 Internal Server Error
class InternalServerError extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('internal server error');
    else super(m);
  }
}

exports.InternalServerError = InternalServerError;
