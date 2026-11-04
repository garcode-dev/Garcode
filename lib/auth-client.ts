"use client";

import { createAuthClient } from "better-auth/react";

// Browser-side helpers: authClient.signUp.email, signIn.email, signOut, requestPasswordReset, resetPassword.
export const authClient = createAuthClient();
