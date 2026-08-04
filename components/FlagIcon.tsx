/* ------------------------------------------------------------------ *
 * FlagIcon — inline SVG flags for the language switcher.
 *
 * Drawn rather than emoji on purpose: regional-indicator emoji render as
 * bare letter pairs on Windows, which is most of this site's desktop
 * traffic. Inline SVG also keeps the header free of any network request.
 *
 * Civil flags (no coat of arms) — accurate colours, simplified detail at
 * the 20px size these are shown.
 * ------------------------------------------------------------------ */

type Props = { code: string; className?: string };

/** 20 x 14 viewBox for every flag so they line up on the same baseline. */
const FLAGS: Record<string, JSX.Element> = {
  // United Kingdom — English
  en: (
    <>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4.6" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.8" />
    </>
  ),
  // United Arab Emirates — Arabic
  ar: (
    <>
      <rect width="20" height="4.67" fill="#00732F" />
      <rect y="4.67" width="20" height="4.66" fill="#fff" />
      <rect y="9.33" width="20" height="4.67" fill="#000" />
      <rect width="5" height="14" fill="#FF0000" />
    </>
  ),
  // Spain
  es: (
    <>
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </>
  ),
  // France
  fr: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.67" height="14" fill="#002395" />
      <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
    </>
  ),
  // Russia
  ru: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect y="4.67" width="20" height="4.66" fill="#0039A6" />
      <rect y="9.33" width="20" height="4.67" fill="#D52B1E" />
    </>
  ),
};

export default function FlagIcon({ code, className }: Props) {
  const flag = FLAGS[code];
  if (!flag) return null;

  return (
    <svg
      viewBox="0 0 20 14"
      className={`shrink-0 rounded-[2px] ring-1 ring-inset ring-black/10 ${className ?? ""}`}
      aria-hidden
    >
      {flag}
    </svg>
  );
}
