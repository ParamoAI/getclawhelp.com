import Head from 'next/head';
import Link from 'next/link';

import { BUSINESS } from '@/config';

import Layout from '@/components/Layout';

import styles from '@/styles/Blog.module.css';

export default function OpenClawDockerSetup() {
  const title = 'OpenClaw Docker Setup: Container-Based Installation';
  const metaTitle = 'OpenClaw Docker Setup: Container-Based Installation';
  const description =
    'Deploy OpenClaw with Docker using the official setup flow, persistent volumes, safer upgrade habits, and a cleaner path for repeatable installs.';
  const slug = 'openclaw-docker-setup';
  const date = 'August 2, 2026';
  const readTime = '14 min read';

  const faqs = [
    {
      question: 'Is Docker required for OpenClaw?',
      answer:
        'No. The official docs describe Docker as optional. It is most useful for an isolated gateway environment, a throwaway test host, or a machine where you do not want a local install.',
    },
    {
      question: 'How much memory does OpenClaw need in Docker?',
      answer:
        'The current Docker docs recommend at least 2 GB RAM for image build because pnpm install can be OOM-killed on 1 GB hosts. More headroom is smart if you add browser tooling, extra plugins, or other services.',
    },
    {
      question: 'Should I build the image locally or use a prebuilt one?',
      answer:
        'Local builds are fine when you are working directly from the repo. Prebuilt images are simpler when you want consistent deployments across hosts. The official docs recommend GHCR or the Docker Hub mirror, not unofficial mirrors.',
    },
    {
      question: 'What is the biggest Docker mistake with OpenClaw?',
      answer:
        'Treating containers as if persistence and firewalling happen automatically. You still need deliberate volume mounts, backups, and public-host hardening if the box is reachable beyond localhost.',
    },
    {
      question: 'When should I get expert help for a Docker deployment?',
      answer:
        'Get help when the deployment will touch production channels, customer data, or executive workflows, or when you are unsure about volume design, auth, reverse proxying, or public-host exposure.',
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-08-02',
    dateModified: '2026-08-02',
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
            A solid <strong>OpenClaw Docker setup</strong> is usually the fastest way to get a
            repeatable, isolated deployment without turning your first install into a long manual
            ops exercise. Containers do not magically make the system simpler, but they do make the
            runtime easier to reproduce, rebuild, and move between hosts when you use them
            deliberately.
          </p>
          <p>
            The official{' '}
            <a href="https://docs.openclaw.ai/install/docker" target="_blank" rel="noopener noreferrer">
              OpenClaw Docker guide
            </a>{' '}
            is clear about the positioning: Docker is optional, and it is best used for an
            isolated gateway environment, a throwaway test host, or a machine without local
            installs. That is the right frame. Docker is not mandatory. It is the cleaner path
            when you want a deployment you can reason about as infrastructure instead of as a pile
            of local machine state.
          </p>
          <p>
            If you are still choosing a host strategy, compare this guide with our{' '}
            <Link href="/blog/openclaw-vps-setup-guide/">VPS setup guide</Link> and{' '}
            <Link href="/blog/openclaw-mac-mini-setup/">Mac Mini setup guide</Link>. If you
            already know you want expert help rather than another weekend debugging session, the
            fastest route is our <Link href="/blog/openclaw-setup-service/">OpenClaw setup service</Link>.
          </p>

          <h2>Why choose Docker for OpenClaw?</h2>
          <p>
            Docker is attractive here because OpenClaw is not just a single binary with no state.
            Real deployments accumulate config, auth material, logs, mounted files, and optional
            channel or browser dependencies. Containers give you a cleaner boundary around that
            runtime so you can control what persists, what gets rebuilt, and what changes between
            environments.
          </p>
          <p>
            In practice, Docker is especially useful when:
          </p>
          <ul>
            <li>you want the same deployment pattern on a laptop, Mac Mini, and VPS</li>
            <li>you want upgrades to look like image replacement instead of hand-edited local state</li>
            <li>you need a safer way to test changes before touching a long-lived host</li>
            <li>you want plugin or browser dependencies isolated from the base machine</li>
            <li>you need a cleaner handoff path for another operator later</li>
          </ul>
          <p>
            The downside is that containers do not remove the need for operations discipline. You
            still need to think about persistent volumes, backups, host firewalling, and what
            should or should not be reachable from outside the machine.
          </p>

          <h2>When Docker is the wrong first answer</h2>
          <p>
            Docker is not automatically the best first path for every team. If you are already
            comfortable with a direct local install and you mainly want the fastest personal
            workstation setup, the normal install flow may be simpler. The official docs say that
            directly. Docker is optional, not the one true path.
          </p>
          <p>
            It is also worth pausing if the team is likely to misunderstand containers as a security
            strategy by themselves. Containerization helps with packaging and isolation, but it does
            not replace good auth design, least privilege, or a careful review of public network
            exposure. If you expect production traffic, pair this article with our{' '}
            <Link href="/blog/openclaw-security-hardening/">security hardening guide</Link>.
          </p>

          <h2>What you need before you start</h2>
          <p>
            The current OpenClaw Docker docs list four practical prerequisites:
          </p>
          <ul>
            <li>Docker Desktop or Docker Engine plus Docker Compose v2</li>
            <li>at least 2 GB RAM for image build</li>
            <li>enough disk for images and logs</li>
            <li>extra hardening review on a VPS or other public host</li>
          </ul>
          <p>
            That memory note matters more than people expect. The docs specifically warn that
            `pnpm install` may be OOM-killed on 1 GB hosts with exit 137. If your builder memory is
            tight, expect a bad time. For a real deployment, buy more headroom than the bare floor.
          </p>
          <p>
            If you are using Docker Desktop, follow the official{' '}
            <a
              href="https://docs.docker.com/desktop/setup/install/mac-install/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docker Desktop install guide for Mac
            </a>{' '}
            or the equivalent Linux and Windows docs for your platform. If you are deploying to a
            Linux host or VPS, the official{' '}
            <a
              href="https://docs.docker.com/engine/install/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docker Engine install docs
            </a>{' '}
            are the safer reference than ad hoc curl scripts copied from forum posts.
          </p>

          <h2>Recommended architecture for a clean Docker deployment</h2>
          <p>
            The cleanest first pattern is simple:
          </p>
          <ul>
            <li>keep OpenClaw source and deployment files in versioned source control</li>
            <li>mount persistent state intentionally instead of hoping the container keeps it</li>
            <li>treat `.env` as part of your operating system, not as disposable scratch</li>
            <li>keep the Control UI local by default and expose it only on purpose</li>
            <li>plan image upgrades and recovery steps before you need them</li>
          </ul>
          <p>
            This is one reason Docker works so well for OpenClaw. The official setup flow already
            expects a predictable repo-root launch point, a synchronized `.env`, generated auth
            material, and Compose startup. The more you preserve that shape, the less surprising the
            deployment becomes later.
          </p>

          <h2>Step-by-step: how to install OpenClaw with Docker</h2>

          <h3>1. Start from the repo root</h3>
          <p>
            The published Docker flow is repo-root oriented. Clone the OpenClaw repository, enter
            the root directory, and keep your Docker Compose operations there. The docs explicitly
            note that `docker compose` should be run from the repo root, especially if you later
            add extra mounts or a custom override file.
          </p>

          <h3>2. Decide whether to build locally or pull a published image</h3>
          <p>
            The default setup script builds a local image:
          </p>
          <pre>
            <code>./scripts/docker/setup.sh</code>
          </pre>
          <p>
            That creates `openclaw:local` and is a good fit when you are working directly from a
            checked-out source tree. If you want a published image instead, the docs support
            setting `OPENCLAW_IMAGE` first and then running the same setup script. Official images
            are published to GHCR first, with a Docker Hub mirror available too.
          </p>
          <p>
            The important operational point is simple: use official images, pin intentionally if
            you need repeatability, and avoid random third-party mirrors that do not share OpenClaw&apos;s
            release timing or retention discipline.
          </p>

          <h3>3. Let the setup script handle onboarding</h3>
          <p>
            One of the nicest parts of the current Docker flow is that onboarding is not a separate
            scavenger hunt. The setup script runs it automatically. According to the official docs,
            it prompts for provider API keys, generates the gateway token, creates the auth-profile
            secret key directory, and starts the gateway through Docker Compose.
          </p>
          <p>
            That means the highest-leverage move is usually not “rewrite the install flow by hand.”
            It is “respect the default flow first, then customize only what you truly need.”
          </p>

          <h3>4. Open the Control UI locally first</h3>
          <p>
            After setup, the docs say to open the Control UI at `http://127.0.0.1:18789/` and use
            the token written to `.env`. That local-first address is a good reminder that you do not
            need to make the interface public just because the container exists. Defaulting to
            localhost is safer and simpler.
          </p>
          <p>
            If you later move this to a VPS or another always-on box, keep the same discipline.
            Reachability should be a deliberate networking choice, not an accident of Compose.
          </p>

          <h3>5. Add channels only after the gateway is healthy</h3>
          <p>
            The Docker docs include channel setup examples such as:
          </p>
          <pre>
            <code>{`docker compose run --rm openclaw-cli channels login
docker compose run --rm openclaw-cli channels add --channel telegram --token "<token>"`}</code>
          </pre>
          <p>
            That order matters. Get the container stable first, then layer in channels like{' '}
            <Link href="/blog/openclaw-slack-integration/">Slack</Link>,{' '}
            <Link href="/blog/openclaw-telegram-setup/">Telegram</Link>, or{' '}
            <Link href="/blog/openclaw-whatsapp-setup/">WhatsApp</Link>. If you try to debug build,
            auth, and channel issues all at once, you lose the clean fault boundary that made
            Docker attractive in the first place.
          </p>

          <h3>6. Make persistence explicit</h3>
          <p>
            A weak Docker setup often “works” until the first rebuild, host restart, or upgrade.
            That is why persistence has to be designed, not assumed. Keep durable state mounted
            outside the container, know exactly which files matter, and make sure backups cover the
            volumes and configuration that recreate the deployment.
          </p>
          <p>
            This is the line between a demo and infrastructure. If losing one container erases your
            auth material, channel state, or recovery path, the problem is not Docker. It is that
            the deployment was never made durable.
          </p>

          <h2>How to upgrade safely</h2>
          <p>
            The official docs describe image replacement as a normal maintenance path when you keep
            the same mounted state and config. They also spell out the failure mode clearly: if
            startup-safe repair cannot complete automatically, the gateway exits instead of claiming
            to be healthy.
          </p>
          <p>
            That is exactly the behavior you want. A failed upgrade should be loud, not quietly
            corrupted. The documented recovery step is to run `openclaw doctor --fix` against the
            same mounted state using the same image, then restart the gateway with its default
            command. This is another reason to care about explicit mounts. Repair is much easier
            when you know what the durable state actually is.
          </p>

          <h2>Common Docker mistakes with OpenClaw</h2>
          <ul>
            <li>treating container restart as a substitute for backups</li>
            <li>building on a 1 GB host and then acting surprised by OOM failures</li>
            <li>making the Control UI reachable from the public internet too early</li>
            <li>mixing ad hoc manual commands with the official setup flow until nobody knows the true state</li>
            <li>adding channels before the base gateway and auth path are stable</li>
            <li>forgetting that public-host Docker installs need host-level firewall review too</li>
          </ul>
          <p>
            The public-host warning in the official docs specifically calls out security hardening
            for network exposure and the Docker `DOCKER-USER` firewall chain. That is not advanced
            paranoia. It is baseline operations hygiene if the host is outside your laptop.
          </p>

          <h2>Docker vs VPS vs Mac Mini</h2>
          <p>
            Docker answers the packaging question. A VPS or Mac Mini answers the host question.
            Those are related but not identical choices.
          </p>
          <p>
            A Mac Mini is a strong fit if you want a private, physically controlled, always-on box.
            A VPS is a stronger fit when you need datacenter-style reachability or clearer remote
            operations. Docker can sit on top of either one and make the application layer more
            repeatable. That is why many serious OpenClaw deployments end up being “Docker on a Mac
            Mini” or “Docker on a VPS,” not “Docker instead of a host strategy.”
          </p>

          <h2>Final takeaway</h2>
          <p>
            OpenClaw Docker setup is worth it when you want a deployment that is easier to
            reproduce, easier to move, and easier to repair than a one-off local install. The
            biggest win is not aesthetic. It is operational clarity.
          </p>
          <p>
            The right approach is to stay close to the official setup flow, make persistence
            explicit, keep reachability narrow by default, and treat upgrades like controlled
            operations instead of casual experimentation. That is how Docker becomes an advantage
            instead of just another layer to debug.
          </p>
          <p>
            If you want help getting that right the first time, start with our{' '}
            <Link href="/blog/openclaw-setup-service/">setup service</Link>,{' '}
            <Link href="/blog/openclaw-help/">troubleshooting guide</Link>, or{' '}
            <Link href="/blog/openclaw-support/">support page</Link>.
          </p>

          <h2>FAQ</h2>
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
            <h3>Want OpenClaw running in Docker without mystery and cleanup later?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Book a free call and we&apos;ll help you choose the right host, container shape, and
              security baseline for a clean deployment.
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
