// The "from" address for emails sent with Resend (contact form and password resets).
//
// Reads CONTACT_FROM and cleans up common copy-paste problems: surrounding quotes (hosts like
// Vercel keep them literally), extra spaces, and curly quotes. Resend accepts either
//   website@garcodedigital.com
//   Garcode Website <website@garcodedigital.com>
export function senderAddress(fallback: string): { from: string; problem?: string } {
  const raw = process.env.CONTACT_FROM;
  if (!raw || !raw.trim()) return { from: fallback };

  const from = raw
    .trim()
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "") // wrapping quotes
    .replace(/\s+/g, " ")
    .replace(/<\s+/, "<")
    .replace(/\s+>/, ">")
    .trim();

  const email = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const named = /^[^<>]+ <[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;
  if (email.test(from) || named.test(from)) return { from };

  return {
    from,
    problem: `CONTACT_FROM is not a valid sender. It must look like website@garcodedigital.com or "Garcode Website <website@garcodedigital.com>". Received: ${JSON.stringify(raw)}`,
  };
}
