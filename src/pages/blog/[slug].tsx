import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { BUSINESS } from '@/config';
import { BLOG_POSTS, BlogPost } from '@/config/blogPosts';

import Layout from '@/components/Layout';

import styles from '@/styles/Blog.module.css';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const title = post.title;
  const description = post.description;

  return (
    <>
      <Layout
        title={title}
        description={description}
        canonicalPath={`/blog/${post.slug}/`}
        ogType="article"
      >
        <article className={styles.article}>
          <Link href="/blog/" className={styles.back}>
            ← Back to Blog
          </Link>
          <h1>{post.title}</h1>
          <div className={styles.articleMeta}>
            {post.date} · {post.readTime}
          </div>
          <p>{post.description}</p>
          <p>
            <em>
              Full article content is being migrated. Please visit the{' '}
              <a
                href={`https://getclawhelp.com/blog/${post.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                original article
              </a>{' '}
              for the complete content.
            </em>
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: '48px',
              padding: '36px',
              background:
                'linear-gradient(135deg, rgba(255,107,74,0.08) 0%, rgba(78,205,196,0.08) 100%)',
              border: '1px solid var(--accent)',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <h3>Ready to get started with OpenClaw?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Book a free 30-minute call and we&apos;ll set everything up for you.
            </p>
            <a
              href={BUSINESS.calendly.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, var(--accent) 0%, #ff8855 100%)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Book Your Free Call →
            </a>
          </div>
        </article>
      </Layout>
    </>
  );
}

// Slugs that have dedicated page files (not rendered by this dynamic route)
const DEDICATED_PAGES = new Set([
  'openclaw-cost-optimization',
  'automate-customer-support-ai',
  'ai-sales-assistant-openclaw',
  'openclaw-small-business-automation',
  'openclaw-vs-chatgpt',
  'openclaw-automation-ideas',
  'openclaw-vps-setup-guide',
  'openclaw-mac-mini-setup',
  'openclaw-for-executives',
  'openclaw-for-small-business',
  'hire-openclaw-expert',
  'openclaw-consultant',
  'openclaw-security-hardening',
  'openclaw-telegram-setup',
  'what-is-an-api-explained-for-non-technical-people',
  'openclaw-whatsapp-setup',
  'openclaw-slack-integration',
  'openclaw-docker-setup',
  'openclaw-vps-deployment',
  'openclaw-setup-service',
  'openclaw-help',
  'openclaw-support',
  'what-is-openclaw',
  'openclaw-mac-mini-m4-vs-m2',
  'openclaw-docker-compose-production-setup',
  'openclaw-security-mistakes',
]);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOG_POSTS.filter((post) => !DEDICATED_PAGES.has(post.slug)).map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};
