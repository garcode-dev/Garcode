import Link from "next/link";

// Internal links use next/link; full URLs (e.g. the Academy enrolment link) open in a new tab.
export default function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link className={className} href={href}>{children}</Link>;
}
