import { serviceContact } from "@/content/site-content";

type ServiceContactPromptProps = {
  className?: string;
  compact?: boolean;
};

export function ServiceContactPrompt({
  className = "",
  compact = false,
}: ServiceContactPromptProps) {
  const emailHref = `mailto:${serviceContact.email}?subject=${encodeURIComponent(serviceContact.subject)}`;

  return (
    <p
      className={`service-contact-prompt${compact ? " service-contact-prompt--compact" : ""} ${className}`.trim()}
    >
      {compact ? null : (
        <span className="service-contact-prompt__question">{serviceContact.prompt}</span>
      )}
      <span>
        {serviceContact.action}{" "}
        <a
          href={emailHref}
          data-analytics-event="cta_click"
          data-analytics-section="service_contact_prompt"
          data-analytics-label="email"
          className="service-contact-prompt__link"
        >
          {serviceContact.email}
        </a>
        .
      </span>
    </p>
  );
}
