/**
 * User service that implements mock functionality
 */
export class UserService {
  private users = ['User1', 'User2', 'User3'];

  getUserCount(): number {
    return this.users.length;
  }

  getUsers(): string[] {
    return [...this.users];
  }
}