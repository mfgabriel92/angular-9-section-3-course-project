export class User {
  constructor(
    public id: string,
    public email: string,
    public token: string,
    public expiresIn: Date
  ) {}

  get userToken() {
    if (!this.expiresIn || new Date() > this.expiresIn) {
      return null;
    }

    return this.token;
  }
}
