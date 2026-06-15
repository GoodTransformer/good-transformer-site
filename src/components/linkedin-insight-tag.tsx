import Script from "next/script";

type LinkedInInsightTagProps = {
  partnerId?: string;
};

export function LinkedInInsightTag({ partnerId }: LinkedInInsightTagProps) {
  const id = partnerId?.trim();

  if (!id) return null;

  return (
    <>
      <Script
        id="linkedin-insight-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window._linkedin_partner_id = ${JSON.stringify(id)};
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
(function(l) {
if (!l) {
window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
window.lintrk.q = [];
}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";
b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);
})(window.lintrk);
          `.trim(),
        }}
      />
      <noscript>
        {/* LinkedIn's official fallback pixel must stay as a plain img. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          src={`https://px.ads.linkedin.com/collect/?pid=${encodeURIComponent(id)}&fmt=gif`}
          style={{ display: "none" }}
          width="1"
        />
      </noscript>
    </>
  );
}
