import ExtendableError from './ExtendableError';

// 409 Conflict
class Conflict extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('conflict');
    else super(m);

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, Conflict.prototype);
  }
}

export = Conflict;
