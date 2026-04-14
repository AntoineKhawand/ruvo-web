import { useEffect } from 'react';

/**
 * usePageMeta — updates <title>, <meta description>, OG tags, canonical URL,
 * and injects a JSON-LD <script> into <head> for every page.
 *
 * @param {string} title        Full page title, e.g. "Features | RUVO"
 * @param {string} description  150-160 char meta description
 * @param {string} path         Route path, e.g. "/features"
 * @param {object} [schema]     Optional JSON-LD schema object
 */
export function usePageMeta(title, description, path, schema) {
  useEffect(() => {
    const canon = `https://ruvo.app${path}`;

    // <title>
    document.title = title;

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const m = sel.match(/\[([^\]=]+)="([^"]+)"\]/);
        if (m) el.setAttribute(m[1], m[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };

    setMeta('meta[name="description"]',    'content', description);
    setMeta('meta[property="og:title"]',   'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]',     'content', canon);
    setLink('canonical', canon);

    // Inject page-level JSON-LD
    let ldScript = document.getElementById('page-jsonld');
    if (schema) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id = 'page-jsonld';
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(schema);
    }

    return () => {
      document.title = 'RUVO | AI Running Coach & Gamified Fitness';
      if (ldScript) ldScript.remove();
    };
  }, [title, description, path, schema]);
}
