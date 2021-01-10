import ExtendableError from './ExtendableError';

// 422 Unprocessable Entity
class UnprocessableEntity extends ExtendableError {
  constructor(m: string) {
    if (arguments.length === 0) super('unprocessable entity');
    else super(m);

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, UnprocessableEntity.prototype);
  }
}

export = UnprocessableEntity;
