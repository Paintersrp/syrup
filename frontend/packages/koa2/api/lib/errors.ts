export class NotFoundError extends Error {
  constructor(modelName: string) {
    const message = `${modelName} not found`;
    super(message);
    this.name = 'NotFoundError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
