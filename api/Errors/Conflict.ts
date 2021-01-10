import ExtendableError from './ExtendableError';

// 409 Conflict
class Conflict extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('conflict');
    else super(m);
  }
}

export = Conflict;
