import type { BetterAuthOptions } from "better-auth";

export declare const authOptions: BetterAuthOptions & {
  emailAndPassword: { enabled: true; minPasswordLength: number; autoSignIn: boolean };
};
