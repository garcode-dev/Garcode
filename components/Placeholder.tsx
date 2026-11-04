import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// Photo slot. Shows the real photo once it's saved in public/images, otherwise a labelled placeholder.
//
// The file name comes from the label: "Learners at work" → public/images/learners-at-work.jpg
// (.jpg, .jpeg, .png or .webp all work). Drop a file in with that name and it appears; no code change needed.
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export const photoSlug = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function findPhoto(label: string): string | null {
  const slug = photoSlug(label);
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", slug + ext))) return `/images/${slug}${ext}`;
  }
  return null;
}

export default function Placeholder({
  label,
  light = false,
  className = "",
  priority = false,
}: {
  label: string;
  light?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const src = findPhoto(label);
  if (src) {
    return (
      <div className={`ph has-photo ${className}`.trim()}>
        <Image src={src} alt={label} fill sizes="(max-width: 720px) 50vw, (max-width: 980px) 100vw, (max-width: 1200px) 40vw, 520px" className="ph-img" priority={priority} />
      </div>
    );
  }
  return (
    <div className={`ph ${light ? "light" : ""} ${className}`.trim()} aria-hidden="true">
      <span className="ph-label">Photo · {label}</span>
    </div>
  );
}
