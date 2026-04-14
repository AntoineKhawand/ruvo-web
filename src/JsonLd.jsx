/**
 * JsonLd — renders a <script type="application/ld+json"> tag in the component
 * tree. AI crawlers and Google both read these from the rendered DOM.
 *
 * Usage:
 *   <JsonLd schema={{ "@type": "FAQPage", ... }} />
 */
export function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
