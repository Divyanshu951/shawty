import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { useSession, signIn, signOut } = authClient;

export type User = typeof authClient.$Infer.Session.user;
