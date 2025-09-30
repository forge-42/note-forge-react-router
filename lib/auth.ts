import PasswordResetEmail from "@/components/emails/reset-email";
import VerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'NoteForge <noteforge@orcdev.com>',
                to: [user.email],
                subject: 'Verify your email address',
                react: VerificationEmail({ userName: user.name, verificationUrl: url }),
            });
        },
        sendOnSignUp: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'NoteForge <noteforge@orcdev.com>',
                to: [user.email],
                subject: 'Reset your password',
                react: PasswordResetEmail({ userName: user.name, resetUrl: url, requestTime: new Date().toLocaleString() }),
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [nextCookies()]
});