export class User {
  // Definiere die Eigenschaften, die dein User-Objekt haben sollte
  // Dies sollten die gleichen Namen sein, wie sie im Backend-Response verwendet werden
  constructor(
    public email: string,
    public password: string,
    public token?: string // Optional: Token, der nach erfolgreichem Login gesetzt wird
  ) {}
}
