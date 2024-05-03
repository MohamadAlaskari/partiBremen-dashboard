export class User {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public name: string,
    public surname: string,
    public dob: Date | null,
    public email: string,
    public password: string,
    public verified: boolean,
    public role: string | null,
    public active: boolean,
  ) {}
}
