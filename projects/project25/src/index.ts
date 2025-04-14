/**
 * Main entry point that uses path aliases to import other modules
 */
import { Button } from '@components/Button';
import { UserService } from '@/services/UserService';
import { calculateTotal } from '@/utils/calculations';

function main() {
  const button = new Button('Click me');
  const userService = new UserService();
  const total = calculateTotal([10, 20, 30]);
  
  console.log(`Button: ${button.render()}`);
  console.log(`User count: ${userService.getUserCount()}`);
  console.log(`Total: ${total}`);
}

main();