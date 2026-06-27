import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { loginLimiter } from "@/lib/rate-limit";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials, request) {
        const parsed = loginSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          throw new Error("Enter a valid email and password.");
        }
        const { email, password } = parsed.data;

        // Rate limit by email to slow down credential-stuffing attempts.
        const { success } = await loginLimiter.limit(`login:${email}`);
        if (!success) {
          throw new Error("Too many login attempts. Please try again in a few minutes.");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Constant-time-ish: still hash-compare against a dummy to avoid
          // trivially timing whether an email exists. bcrypt.compare against
          // a fixed hash adds negligible but non-zero protection.
          await bcrypt.compare(password, "$2a$10$invalidsaltinvalidsaltinvalidsa");
          await prisma.loginAttempt.create({
            data: { email, success: false },
          });
          throw new Error("Invalid email or password.");
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        await prisma.loginAttempt.create({
          data: { userId: user.id, email, success: isValid },
        });

        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
