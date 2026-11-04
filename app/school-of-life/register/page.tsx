import type { Metadata } from "next";
import AuthPage from "@/components/sol/AuthPage";

export const metadata: Metadata = { title: "Join School of Life | School of Life by Garcode", robots: { index: false } };

export default function Page() {
  return <AuthPage mode="register" />;
}
