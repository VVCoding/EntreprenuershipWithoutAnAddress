import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    userType: 'entrepreneur' | 'investor';
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: 'entrepreneur' | 'investor';
  }
} 