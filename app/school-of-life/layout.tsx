import Link from "next/link";
import { getUser } from "@/lib/auth";
import SignOutButton from "@/components/sol/SignOutButton";
import SolNavLinks from "@/components/sol/SolNavLinks";

// Every School of Life page gets this sub-bar under the main navigation: where you are,
// plus log in / join, or your dashboard and log out.
export default async function SchoolOfLifeLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <div className="sol">
      <div className="sol-bar">
        <div className="wrap sol-bar-inner">
          <Link href="/school-of-life" className="sol-brand">
            School of Life <span>by Garcode</span>
          </Link>
          <SolNavLinks signedIn={!!user} />
          <div className="sol-bar-actions">
            {user ? (
              <>
                <span className="sol-user" title={user.email}>
                  <span className="sol-avatar" aria-hidden="true">{user.name.trim().charAt(0).toUpperCase() || "G"}</span>
                  <span className="sol-user-name">{user.name.split(" ")[0]}</span>
                </span>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link className="sol-link" href="/school-of-life/login">Log In</Link>
                <Link className="btn btn-primary btn-sm" href="/school-of-life/register">Join Free</Link>
              </>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
