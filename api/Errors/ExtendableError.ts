class ExtendableError extends Error {
  constructor(message: string) {
    if (new.target === ExtendableError)
      throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.contructor);
  }
  contructor(arg0: this, contructor: any) {
    throw new Error('Method not implemented.');
  }
}

export = ExtendableError;
