import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Sign-up, sign-in, sign-out, sessions and password reset for School of Life.
export const { GET, POST } = toNextJsHandler(auth.handler);
