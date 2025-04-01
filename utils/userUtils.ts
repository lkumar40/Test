import { randomBytes } from 'crypto';
// Generate a random email for each test run
export const generateRandomEmail = () => {
  return `test_${randomBytes(4).toString('hex')}@example.com`;
};