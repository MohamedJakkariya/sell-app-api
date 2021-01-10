import ExtendableError from './ExtendableError';

// 403 Forbidden
class Forbidden extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('forbidden');
    else super(m);
  }
}

export = Forbidden;
