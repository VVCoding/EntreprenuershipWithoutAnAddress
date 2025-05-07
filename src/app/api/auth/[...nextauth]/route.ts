import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const result = await pool.query(
          'SELECT id, email, password_hash, user_type FROM users WHERE email = $1',
          [credentials.email]
        );
        const user = result.rows[0];

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash);
        if (!passwordMatch) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          userType: user.user_type,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST }; 