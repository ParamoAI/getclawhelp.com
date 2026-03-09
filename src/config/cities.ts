export interface City {
  slug: string;
  name: string;
  country: string;
  description: string;
  localFlavor: string;
}

// City pages removed Mar 9, 2026 — thin pSEO pages were hurting domain quality.
// Keeping the type definition for potential future use with higher-quality content.
// Decision: https://linear.app/paramo-ai/issue/PAR-150
export const CITIES: City[] = [];
