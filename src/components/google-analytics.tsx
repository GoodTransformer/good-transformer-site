import Script from "next/script";

type GoogleAnalyticsProps = {
  measurementId?: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const id = measurementId?.trim();

  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
// Consent Mode v2: deny all storage by default (privacy-first, UK/GDPR).
// Must be queued before config so GA starts in cookieless modeling mode;
// the consent banner calls gtag('consent','update',...) once the visitor
// accepts. wait_for_update holds the first hit briefly for that signal.
// A returning visitor's stored decision restores ALL signals so it matches
// what the banner wrote on accept (not just analytics_storage).
var stored = null;
try { stored = window.localStorage.getItem('gt-analytics-consent'); } catch (e) {}
var granted = stored === 'granted' ? 'granted' : 'denied';
gtag('consent', 'default', {
  ad_storage: granted,
  ad_user_data: granted,
  ad_personalization: granted,
  analytics_storage: granted,
  wait_for_update: 500,
});
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});
          `.trim(),
        }}
      />
    </>
  );
}
