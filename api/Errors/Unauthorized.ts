import ExtendableError from './ExtendableError';

// 401 Unauthorized
class Unauthorized extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('unauthorized');
    else super(m);

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

export = Unauthorized;
