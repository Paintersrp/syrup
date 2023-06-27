class CLIError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

export { CLIError };
