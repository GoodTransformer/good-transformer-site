import Link from "next/link";

type Action = {
  href: string;
  label: string;
};

type CTAGroupProps = {
  primary: Action;
  secondary?: Action;
  tone?: "light" | "dark";
};

export function CTAGroup({
  primary,
  secondary,
  tone = "dark",
}: CTAGroupProps) {
  const primaryClass =
    tone === "light"
      ? "border-sand bg-sand text-ink hover:bg-paper"
      : "border-ink bg-ink text-paper hover:bg-ink/90";
  const secondaryClass =
    tone === "light"
      ? "border-paper/42 text-paper hover:border-paper/70 hover:bg-paper/8"
      : "border-line text-ink hover:border-ink/45 hover:bg-sand/80";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href={primary.href}
        className={`inline-flex min-h-12 items-center justify-center rounded-[0.45rem] border px-6 py-3 text-sm font-medium transition-colors ${primaryClass}`}
      >
        {primary.label}
      </Link>
      {secondary ? (
        <Link
          href={secondary.href}
          className={`inline-flex min-h-12 items-center justify-center rounded-[0.45rem] border px-6 py-3 text-sm font-medium transition-colors ${secondaryClass}`}
        >
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}
