import type { Metadata } from "next";
import AuthPage from "@/components/sol/AuthPage";

export const metadata: Metadata = { title: "Log In | School of Life by Garcode", robots: { index: false } };

export default function Page() {
  return <AuthPage mode="login" />;
}
