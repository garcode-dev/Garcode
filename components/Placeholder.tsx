// Photo placeholder. Replace with <Image src="/images/..." /> from next/image once client photos arrive.
export default function Placeholder({
  label,
  light = false,
  className = "",
}: {
  label: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`ph ${light ? "light" : ""} ${className}`.trim()} aria-hidden="true">
      <span className="ph-label">Photo · {label}</span>
    </div>
  );
}
