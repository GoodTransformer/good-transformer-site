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
      ? "bg-sand text-ink hover:bg-paper"
      : "bg-ink text-paper hover:bg-ink/90";
  const secondaryClass =
    tone === "light" ? "text-paper/84 hover:text-paper" : "text-ink/76 hover:text-ink";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Link
        href={primary.href}
        className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${primaryClass}`}
      >
        {primary.label}
      </Link>
      {secondary ? (
        <Link href={secondary.href} className={`text-link text-sm ${secondaryClass}`}>
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}
