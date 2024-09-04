import jwt from 'jsonwebtoken';

const SECRET_KEY = 'YOUR_SECRET_KEY';

interface User {
  id: string;
  name: string;
  // Add other user properties as needed
}

// Verify the authentication token
export function verifyToken(token: string | undefined): User | null {
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY) as User;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
