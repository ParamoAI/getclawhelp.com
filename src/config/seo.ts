import { BUSINESS } from './business';

const BASE_TITLE = `OpenClaw Help — ${BUSINESS.tagline}`;

export const SEO = {
  formatTitle: (page?: string) => (page ? `${page} | ${BUSINESS.name}` : BASE_TITLE),

  description: {
    default: BUSINESS.description,
  },

  og: {
    type: 'website',
    url: BUSINESS.url,
    image: `${BUSINESS.url}/og-image.png`,
    twitter: {
      card: 'summary_large_image',
      site: BUSINESS.social.twitter,
    },
  },

  keywords: [
    'OpenClaw setup',
    'OpenClaw help',
    'OpenClaw VPS setup',
    'install OpenClaw',
    'OpenClaw installation service',
    'OpenClaw setup service',
    'OpenClaw skills',
    'OpenClaw configuration',
    'OpenClaw automation',
    'self-hosted AI assistant',
    'AI assistant setup',
    'OpenClaw Docker setup',
    'OpenClaw for business',
    'OpenClaw consultant',
    'get OpenClaw',
  ],
} as const;
