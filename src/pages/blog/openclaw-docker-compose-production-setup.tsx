import Head from 'next/head';
import Link from 'next/link';

import { BUSINESS } from '@/config';

import Layout from '@/components/Layout';

import styles from '@/styles/Blog.module.css';

export default function OpenClawDockerComposeProductionSetup() {
  const title = 'OpenClaw Docker Compose: Multi-Container Production Setup';
  const metaTitle = 'OpenClaw Docker Compose: Production Setup';
  const description =
    'Build a production-ready OpenClaw Docker Compose setup with services, networks, volumes, secrets, reverse proxy, backups, and update discipline.';
  const slug = 'openclaw-docker-compose-production-setup';
  const date = 'October 6, 2026';
  const readTime = '15 min read';

  const faqs = [
    {
      question: 'Is Docker Compose enough for a production OpenClaw setup?',
      answer:
        'Yes, Docker Compose can be enough for a single-node OpenClaw deployment when it is designed with named volumes, isolated networks, restart policies, backups, monitoring, and a clean update path.',
    },
    {
      question: 'What should be split into separate containers?',
      answer:
        'Keep the OpenClaw gateway, reverse proxy, database or durable state services, monitoring, and optional worker services separate so each component can restart, update, and scale without disturbing the whole stack.',
    },
    {
      question: 'Should OpenClaw secrets live in the Compose file?',
      answer:
        'No. The Compose file can reference environment variables or secret files, but raw API keys, bot tokens, and provider credentials should not be committed to source control.',
    },
    {
      question: 'Do I need Kubernetes instead of Docker Compose?',
      answer:
        'Usually not for a personal assistant, founder setup, or small team deployment. Kubernetes becomes more attractive when you need multi-node orchestration, complex autoscaling, or dedicated platform engineering support.',
    },
    {
      question: 'What is the biggest production mistake with Compose?',
      answer:
        'The biggest mistake is treating the stack like a demo: no backup plan, no pinned images, no health checks, no log retention, no documented recovery process, and no separation between public and private services.',
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-10-06',
    dateModified: '2026-10-06',
    author: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BUSINESS.url}/blog/${slug}/`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        title={metaTitle}
        description={description}
        canonicalPath={`/blog/${slug}/`}
        ogType="article"
      >
        <article className={styles.article}>
          <Link href="/blog/" className={styles.back}>
            ← Back to Blog
          </Link>
          <h1>{title}</h1>
          <div className={styles.articleMeta}>
            {date} · {readTime}
          </div>

          <p>
            A good <strong>OpenClaw Docker setup</strong> starts simple, but it should not stay
            improvised once the assistant becomes part of daily operations. The early version is
            often one service, one environment file, one exposed port, and a hopeful restart. A
            production Docker Compose setup has a different job. It gives OpenClaw a repeatable home
            with clear service boundaries, durable state, controlled network exposure, and a
            recovery path that still makes sense at 2 a.m.
          </p>
          <p>
            Docker&apos;s official Compose documentation describes Compose as a way to define and
            run multi-container applications from a single YAML file. Docker&apos;s production guide
            also emphasizes separating production configuration, managing environment variables, and
            having a deliberate deployment workflow. For OpenClaw, that maps neatly to the
            real-world shape of the system: a gateway, channel connectors, durable config, optional
            workers, monitoring, and a public entry point that should be much narrower than the
            private stack behind it.
          </p>
          <p>
            If you are still at the first-install stage, start with our{' '}
            <Link href="/blog/openclaw-docker-setup/">OpenClaw Docker setup guide</Link> or the
            broader <Link href="/blog/openclaw-mac-mini-setup/">Mac Mini setup guide</Link>. If the
            assistant is already useful and you are preparing it for serious use, this is the
            version you want before more channels, people, and workflows depend on it.
          </p>

          <h2>The production goal: boring, recoverable infrastructure</h2>
          <p>
            Production does not mean complicated. It means the stack can survive normal operational
            events: restarts, package updates, expired credentials, log growth, network changes, and
            a human making a mistake during maintenance. A Compose deployment can handle that well
            if you make the system explicit.
          </p>
          <p>A production-ready OpenClaw Compose file should answer six questions:</p>
          <ul>
            <li>Which services exist, and what does each one own?</li>
            <li>Which data must persist after a container is replaced?</li>
            <li>Which ports are public, and which services stay private?</li>
            <li>Where do secrets live, and how are they rotated?</li>
            <li>How do logs, health checks, and alerts prove the system is alive?</li>
            <li>How do you back up, restore, and update without guessing?</li>
          </ul>
          <p>
            Those questions matter whether you are running OpenClaw on a{' '}
            <Link href="/blog/openclaw-vps-deployment/">VPS</Link>, a dedicated{' '}
            <Link href="/blog/openclaw-mac-mini-m4-vs-m2/">Mac Mini</Link>, or a small internal
            server for a team in <Link href="/cities/austin/">Austin</Link>,{' '}
            <Link href="/cities/new-york-city/">New York City</Link>, or{' '}
            <Link href="/cities/san-francisco/">San Francisco</Link>.
          </p>

          <h2>Start with service boundaries, not ports</h2>
          <p>
            The wrong way to design a Compose stack is to ask, &quot;What ports do I need to
            expose?&quot; Start instead with responsibilities. The OpenClaw gateway should be the
            main application surface. A reverse proxy should handle TLS and public routing. A
            database or durable state service should own persistent data if your deployment needs
            one. Monitoring and log collection should be separate from the app so they keep working
            when the app is unhealthy.
          </p>
          <p>A practical single-node stack often includes:</p>
          <ul>
            <li>
              <strong>openclaw:</strong> the gateway and primary application container.
            </li>
            <li>
              <strong>proxy:</strong> Caddy, Traefik, or Nginx for TLS, host routing, and public
              entry.
            </li>
            <li>
              <strong>state:</strong> a database, cache, or durable local service if required by the
              deployment.
            </li>
            <li>
              <strong>worker:</strong> optional background automation, scheduled tasks, or queue
              processing.
            </li>
            <li>
              <strong>monitoring:</strong> uptime checks, log shipping, or lightweight metrics.
            </li>
          </ul>
          <p>
            This separation makes maintenance less dramatic. You can restart a proxy without
            touching state. You can update a worker without interrupting the gateway. You can read
            logs from the component that failed instead of searching one blended process for clues.
          </p>

          <h2>Use named volumes for state you cannot lose</h2>
          <p>
            Docker&apos;s volume documentation recommends volumes for data generated and used by
            containers. That recommendation matters for OpenClaw because production value tends to
            accumulate in small files and stateful directories: configuration, session state, local
            caches, logs, generated artifacts, and any database data. If it matters after a
            container replacement, it should not live only inside the container filesystem.
          </p>
          <p>
            The rule is simple: containers are replaceable, state is not. Use named volumes for
            application state and back them up deliberately. Use bind mounts only when the host path
            is part of the operational model, such as a versioned config directory that you review
            and deploy intentionally.
          </p>
          <p>A healthy Compose file makes durable storage obvious:</p>
          <pre>
            <code>{`volumes:
  openclaw_data:
  openclaw_logs:

services:
  openclaw:
    image: openclaw/openclaw:stable
    volumes:
      - openclaw_data:/var/lib/openclaw
      - openclaw_logs:/var/log/openclaw`}</code>
          </pre>
          <p>
            The exact image and paths depend on your deployment, but the design principle is the
            same. Any future operator should be able to open the file and see what must be backed up
            before changing the stack.
          </p>

          <h2>Keep public and private networks separate</h2>
          <p>
            Most OpenClaw services do not need to be reachable from the internet. The public edge
            should usually be the reverse proxy. Everything else should sit on an internal Compose
            network unless there is a clear reason to expose it.
          </p>
          <p>
            This is one of the simplest security wins in an{' '}
            <Link href="/blog/openclaw-security-hardening/">OpenClaw security hardening</Link> plan.
            Do not publish database ports. Do not expose admin panels casually. Do not map every
            service to the host because it made debugging easier on day one. Map the proxy to the
            host, route traffic to the app internally, and keep the rest private by default.
          </p>
          <pre>
            <code>{`networks:
  public:
  private:
    internal: true

services:
  proxy:
    networks:
      - public
      - private
    ports:
      - "443:443"

  openclaw:
    networks:
      - private`}</code>
          </pre>
          <p>
            This pattern also makes future reviews easier. When something is public, it is visible
            in one place. When a service is private, that is equally visible.
          </p>

          <h2>Handle secrets like production credentials</h2>
          <p>
            OpenClaw deployments often connect to model providers, chat channels, calendars, CRMs,
            and internal tools. That means the Compose stack can touch API keys, bot tokens, OAuth
            credentials, and webhook secrets. Treat those values as production credentials from the
            start.
          </p>
          <p>
            Do not commit raw secrets into <code>compose.yaml</code>. Do not paste them into a
            README. Do not share screenshots that show them. The Compose file can reference
            environment variables, an ignored <code>.env</code> file, or provider-specific secret
            files, but the values themselves should stay out of Git.
          </p>
          <p>
            Good secret hygiene also includes ownership. Know who can rotate each credential, where
            the current value is stored, and which services need a restart after rotation. If nobody
            knows how to rotate a token, the deployment is not production-ready yet.
          </p>

          <h2>Add health checks and restart behavior deliberately</h2>
          <p>
            A restart policy is not a monitoring strategy, but it is still useful. The goal is to
            recover from ordinary process exits without hiding deeper failures forever. Pair restart
            policies with health checks so your operator can tell the difference between &quot;the
            container is running&quot; and &quot;the service is usable.&quot;
          </p>
          <pre>
            <code>{`services:
  openclaw:
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s`}</code>
          </pre>
          <p>
            The health endpoint and port should match your actual OpenClaw deployment, but the habit
            matters more than the snippet. If your assistant is part of daily work, you should be
            able to answer whether it is healthy without opening three terminals and guessing.
          </p>

          <h2>Pin images and make updates boring</h2>
          <p>
            Floating tags are convenient until they surprise you. For a production OpenClaw Docker
            setup, pin images to a known version or digest where practical, then update
            intentionally. Keep the Compose file in source control, review changes, and write down
            the rollback path before the update starts.
          </p>
          <p>A calm update flow looks like this:</p>
          <ol>
            <li>Read release notes for the components you are changing.</li>
            <li>Back up named volumes and configuration.</li>
            <li>Pull the new images.</li>
            <li>Restart one service group at a time where possible.</li>
            <li>Verify health checks, logs, and a real chat workflow.</li>
            <li>Keep the previous version available until the new one is proven.</li>
          </ol>
          <p>
            That workflow is slower than &quot;pull latest and hope,&quot; but it is much faster
            than reconstructing a broken assistant from memory.
          </p>

          <h2>Backups are part of the app, not an afterthought</h2>
          <p>
            If the OpenClaw host died tonight, what would you restore? The answer should include the
            Compose file, environment template, secret references, named volumes, DNS notes, reverse
            proxy config, and any durable state. It should also include a short restore procedure
            that someone other than the original installer can follow.
          </p>
          <p>
            This is where many DIY installs fail. They have a working assistant, but no clean copy
            of the exact deployment shape. The host becomes the only documentation. That is risky on
            a VPS and even riskier when the system lives on a personal machine under someone&apos;s
            desk.
          </p>
          <p>
            Test the restore path before you need it. A backup that has never been restored is only
            a theory.
          </p>

          <h2>When Docker Compose is the right level of complexity</h2>
          <p>
            Docker Compose is a strong fit for one reliable host, one primary OpenClaw deployment,
            and a small number of supporting services. It is easier to understand than Kubernetes,
            easier to operate for non-platform teams, and usually more than enough for personal AI
            assistant infrastructure, small business automation, and executive workflows.
          </p>
          <p>
            You should start looking beyond Compose when you need multi-node scheduling, automated
            horizontal scaling, service mesh patterns, or a dedicated platform team that will own
            the complexity. Until then, the better move is usually a well-designed Compose stack,
            not a bigger orchestration system.
          </p>

          <h2>The practical production checklist</h2>
          <p>Before you call the deployment production-ready, run through this checklist:</p>
          <ul>
            <li>The Compose file is committed without secrets.</li>
            <li>All durable data is in named volumes or documented host paths.</li>
            <li>Only the reverse proxy or intended public service exposes host ports.</li>
            <li>Images are pinned to intentional versions.</li>
            <li>Health checks exist for the services that matter.</li>
            <li>Logs have retention, rotation, or shipping.</li>
            <li>Backups are automated and a restore has been tested.</li>
            <li>The update and rollback process is written down.</li>
          </ul>
          <p>
            That checklist is not glamorous. That is the point. Production OpenClaw should feel
            calm, inspectable, and recoverable. Once the infrastructure is boring, the assistant can
            focus on the interesting work.
          </p>

          <h2>FAQ: OpenClaw Docker Compose production setup</h2>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

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
            <h3>Want the Docker Compose stack set up cleanly?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We can install OpenClaw, design the Compose stack, secure the public edge, document
              recovery, and hand you a deployment that is ready for real daily use.
            </p>
            <a
              href="https://calendly.com/d/cvcf-mw2-x4z/getclawhelp-setup-call-powered-by-paramo-sh"
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
              Book Your Setup Call →
            </a>
          </div>
        </article>
      </Layout>
    </>
  );
}
