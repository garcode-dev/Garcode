"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FeatureIcon } from "../Icons";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="sol-link sol-signout"
      aria-label="Log out"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await authClient.signOut();
        router.push("/school-of-life");
        router.refresh();
      }}
    >
      <FeatureIcon name="logout" /> <span className="sol-signout-label">{busy ? "Logging out…" : "Log Out"}</span>
    </button>
  );
}
