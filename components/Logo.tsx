import Link from "next/link";

// Placeholder barcode-style mark. TODO: swap for Garcode's real logo (put it in /public and use next/image).
export default function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Garcode home">
      <span className="logo-mark" aria-hidden="true">
        <span style={{ width: 2 }} />
        <span style={{ width: 4 }} />
        <span style={{ width: 1.5 }} />
        <span style={{ width: 3 }} />
      </span>
      Garcode
    </Link>
  );
}
