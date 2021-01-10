import ExtendableError from './ExtendableError';

// 404 Not Found
class NotFound extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('not found');
    else super(m);

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

exports.NotFound = NotFound;
