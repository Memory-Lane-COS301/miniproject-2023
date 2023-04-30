declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
  