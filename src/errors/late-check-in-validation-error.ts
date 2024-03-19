export class LateCheckInValidationError extends Error {
  constructor() {
    super("Check-in can only be validated 20 minutes after creation");
  }
}
