import ExtendableError from './ExtendableError';

// 400 Bad Request
class BadRequest extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('bad request');
    else super(m);

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export = BadRequest;
