export class User {
  constructor(
    public id: string,
    public email: string,
    private token: string,
    private expiresIn: Date
  ) {}

  get userToken() {
    if (!this.expiresIn || new Date() > this.expiresIn) {
      return null;
    }

    return this.token;
  }
}
