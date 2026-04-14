import { useState, useEffect } from 'react';

export const slugify = (text) => text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

export function useScrollSpy(sectionHeadings, offset = 150) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const heading of sectionHeadings) {
        const el = document.getElementById(slugify(heading));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = slugify(heading);
          }
        }
      }
      if (current === "" && sectionHeadings.length > 0) {
        current = slugify(sectionHeadings[0]);
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHeadings.join(','), offset]); // Rerun if headings or offset change

  return activeSection;
}