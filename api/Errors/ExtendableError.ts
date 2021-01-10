class ExtendableError extends Error {
  constructor(message: string) {
    if (new.target === ExtendableError)
      throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    // Set the prorotype explicitly
    Object.setPrototypeOf(this, ExtendableError.prototype);
  }
}

export = ExtendableError;
