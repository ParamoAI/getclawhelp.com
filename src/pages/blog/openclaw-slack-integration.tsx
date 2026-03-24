import Head from 'next/head';
import Link from 'next/link';

import { BUSINESS, SEO } from '@/config';

import Layout from '@/components/Layout';

import styles from '@/styles/Blog.module.css';

export default function OpenClawSlackIntegration() {
  const title = 'OpenClaw Slack Integration: Add AI to Your Workspace';
  const description =
    'Connect OpenClaw to Slack step by step. Add a powerful AI assistant to your team workspace for automated workflows, instant answers, and 24/7 productivity.';
  const slug = 'openclaw-slack-integration';
  const date = 'March 17, 2026';
  const readTime = '13 min read';

  const faqs = [
    {
      question: 'Is the OpenClaw Slack integration free?',
      answer:
        'The Slack integration itself is free — OpenClaw is open source and there are no per-message fees for the Slack channel. You will need a Slack workspace (free or paid plan) and API credentials from a Slack app you create. Your only ongoing costs are the server running OpenClaw and your AI model API usage (e.g., Claude or GPT-4).',
    },
    {
      question: 'Can OpenClaw respond in Slack threads?',
      answer:
        'Yes. OpenClaw supports threaded conversations in Slack. When a user replies in a thread, OpenClaw can follow the thread context and respond within the same thread, keeping channels organized. This is configured automatically when you enable the Slack channel.',
    },
    {
      question: 'Does OpenClaw work with Slack free plan workspaces?',
      answer:
        'Yes. OpenClaw works with Slack free, Pro, Business+, and Enterprise Grid plans. The Slack Bot Token API works the same across all plans. The only limitation on free plans is the 90-day message history, but that does not affect OpenClaw since it maintains its own conversation context.',
    },
    {
      question: 'Can I use OpenClaw in multiple Slack channels?',
      answer:
        'Absolutely. You can invite the OpenClaw bot to as many channels as you want. You can configure different behaviors per channel — for example, the bot might actively respond in a support channel but only listen and summarize in a general channel. Channel-specific behavior is controlled through OpenClaw skills and configuration.',
    },
    {
      question: 'Will OpenClaw read all messages in my Slack workspace?',
      answer:
        'No. OpenClaw only receives messages in channels where the bot has been explicitly invited. It cannot read messages in channels it has not joined, and it cannot access direct messages between other users. You have full control over which channels the bot can see.',
    },
    {
      question: 'Can I connect OpenClaw to Slack and WhatsApp at the same time?',
      answer:
        'Yes. OpenClaw supports multiple channels simultaneously. You can run Slack, WhatsApp, Telegram, Discord, and more — all connected to the same AI assistant with shared context and skills. Messages from any channel are processed by the same underlying AI.',
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: '2026-03-17',
    dateModified: '2026-03-17',
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
        <title>{SEO.formatTitle(title)}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${BUSINESS.url}/blog/${slug}/`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BUSINESS.url}/blog/${slug}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout title={title} description={description}>
        <article className={styles.article}>
          <Link href="/blog/" className={styles.back}>
            ← Back to Blog
          </Link>
          <h1>{title}</h1>
          <div className={styles.articleMeta}>
            {date} · {readTime}
          </div>

          <p>
            Slack is where your team already lives — it is where decisions get made,
            questions get asked, and work gets done. Now imagine having an AI assistant
            sitting right there in your workspace, ready to answer questions, run
            automations, and handle tasks around the clock.
          </p>
          <p>
            That is exactly what the <strong>OpenClaw Slack integration</strong> gives you.
            With a self-hosted AI connected directly to your Slack workspace, your team gets
            instant access to a powerful assistant without leaving the tool they already use
            every day.
          </p>
          <p>
            This guide walks you through the complete setup — from creating a Slack app to
            sending your first message to your AI. The whole process takes about 20–30
            minutes. By the end, you will have a fully functional AI assistant living
            inside your Slack workspace.
          </p>
          <p>
            New to OpenClaw?{' '}
            <Link href="/blog/what-is-openclaw/">
              Read our complete guide to what OpenClaw is
            </Link>{' '}
            before continuing. If you need help getting OpenClaw installed first, check
            out our{' '}
            <Link href="/blog/openclaw-setup-service/">professional setup service</Link>.
          </p>

          <h2>Why Slack + OpenClaw?</h2>
          <p>
            Most AI tools force you to switch context — open a new tab, log into a
            dashboard, copy-paste results back into your workflow. Slack integration
            eliminates that friction entirely. Your AI lives where your team works.
          </p>
          <p>Here is why Slack is one of the best channels for OpenClaw:</p>
          <ul>
            <li>
              <strong>Zero context switching.</strong> Ask your AI a question in the same
              place you are already having conversations. No new tabs, no new apps.
            </li>
            <li>
              <strong>Team-wide access.</strong> Everyone in the workspace can interact
              with the AI. No individual accounts or logins needed.
            </li>
            <li>
              <strong>Threaded conversations.</strong> Slack threads keep AI interactions
              organized. A question in #support stays in its own thread — no channel
              clutter.
            </li>
            <li>
              <strong>Rich formatting.</strong> OpenClaw can send formatted responses with
              code blocks, bullet lists, links, and even file attachments directly in
              Slack.
            </li>
            <li>
              <strong>Channel-based permissions.</strong> Control where the AI can respond
              by choosing which channels to invite it to. Keep it out of sensitive
              channels entirely.
            </li>
            <li>
              <strong>Searchable history.</strong> Every AI interaction is logged in
              Slack&apos;s searchable history. Need that answer from last week? Just search
              for it.
            </li>
          </ul>
          <p>
            Already set up other channels?{' '}
            <Link href="/blog/openclaw-whatsapp-setup/">
              Check our WhatsApp integration guide
            </Link>{' '}
            or{' '}
            <Link href="/blog/openclaw-telegram-setup/">
              Telegram integration guide
            </Link>{' '}
            — you can run all three simultaneously.
          </p>

          <h2>Prerequisites</h2>
          <p>Before you start, make sure you have:</p>
          <ol>
            <li>
              <strong>A running OpenClaw instance.</strong> This can be on a{' '}
              <Link href="/blog/openclaw-vps-setup-guide/">VPS</Link>, a{' '}
              <Link href="/blog/openclaw-mac-mini-setup/">Mac Mini</Link>, or a{' '}
              <Link href="/blog/openclaw-docker-setup/">Docker container</Link>. If you do
              not have OpenClaw installed yet, our{' '}
              <Link href="/blog/openclaw-setup-service/">setup service</Link> can get you
              running in under 30 minutes.
            </li>
            <li>
              <strong>Admin access to a Slack workspace.</strong> You need permissions to
              create and install Slack apps. If you are not an admin, ask your workspace
              administrator to follow along.
            </li>
            <li>
              <strong>A Slack workspace</strong> on any plan (Free, Pro, Business+, or
              Enterprise Grid). The integration works with all plans.
            </li>
            <li>
              <strong>SSH or terminal access to your OpenClaw server</strong> to edit the
              configuration file and restart the gateway.
            </li>
          </ol>

          <h2>Step 1: Create a Slack App</h2>
          <p>
            The first step is creating a Slack app that will act as your AI
            assistant&apos;s identity in the workspace. Think of the Slack app as the
            &quot;body&quot; your AI wears when it shows up in Slack.
          </p>
          <ol>
            <li>
              Go to{' '}
              <a
                href="https://api.slack.com/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                api.slack.com/apps
              </a>{' '}
              and click <strong>Create New App</strong>.
            </li>
            <li>
              Choose <strong>From scratch</strong> (not from a manifest).
            </li>
            <li>
              Name your app something recognizable — for example, &quot;OpenClaw
              AI&quot; or your assistant&apos;s name.
            </li>
            <li>Select the workspace where you want to install it.</li>
            <li>
              Click <strong>Create App</strong>.
            </li>
          </ol>
          <p>
            You now have a Slack app shell. Next, you need to give it the right
            permissions.
          </p>

          <h2>Step 2: Configure Bot Permissions (Scopes)</h2>
          <p>
            Your Slack app needs specific permissions to read messages, send responses,
            and interact with channels. These are called &quot;OAuth scopes.&quot;
          </p>
          <ol>
            <li>
              In your app settings, go to{' '}
              <strong>OAuth &amp; Permissions</strong> in the left sidebar.
            </li>
            <li>
              Scroll down to <strong>Bot Token Scopes</strong>.
            </li>
            <li>
              Add the following scopes:
              <ul>
                <li>
                  <code>app_mentions:read</code> — Lets the bot see when someone
                  @mentions it.
                </li>
                <li>
                  <code>channels:history</code> — Lets the bot read messages in public
                  channels it has joined.
                </li>
                <li>
                  <code>channels:read</code> — Lets the bot see a list of public
                  channels.
                </li>
                <li>
                  <code>chat:write</code> — Lets the bot send messages.
                </li>
                <li>
                  <code>groups:history</code> — Lets the bot read messages in private
                  channels it has been invited to.
                </li>
                <li>
                  <code>groups:read</code> — Lets the bot see private channels it is
                  in.
                </li>
                <li>
                  <code>im:history</code> — Lets the bot read direct messages sent to
                  it.
                </li>
                <li>
                  <code>im:read</code> — Lets the bot see its direct message
                  conversations.
                </li>
                <li>
                  <code>reactions:write</code> — Lets the bot add emoji reactions to
                  messages.
                </li>
                <li>
                  <code>files:read</code> — Lets the bot download files shared in
                  conversations.
                </li>
                <li>
                  <code>files:write</code> — Lets the bot upload and share files.
                </li>
                <li>
                  <code>users:read</code> — Lets the bot look up user display names.
                </li>
              </ul>
            </li>
          </ol>
          <p>
            These scopes give the bot everything it needs to participate in conversations
            naturally. It can read messages, respond, react with emoji, and handle file
            attachments.
          </p>

          <h2>Step 3: Enable Event Subscriptions</h2>
          <p>
            For your bot to receive messages in real time, you need to enable Socket Mode
            or Event Subscriptions. OpenClaw uses <strong>Socket Mode</strong>, which is
            simpler because it does not require a public URL or webhook endpoint.
          </p>
          <ol>
            <li>
              Go to <strong>Socket Mode</strong> in the left sidebar and toggle it{' '}
              <strong>on</strong>.
            </li>
            <li>
              You will be prompted to create an <strong>App-Level Token</strong>. Name
              it something like &quot;openclaw-socket&quot; and give it the{' '}
              <code>connections:write</code> scope.
            </li>
            <li>
              Copy the token that starts with <code>xapp-</code>. You will need this
              later.
            </li>
            <li>
              Now go to <strong>Event Subscriptions</strong> in the left sidebar and
              toggle it <strong>on</strong>.
            </li>
            <li>
              Under <strong>Subscribe to bot events</strong>, add:
              <ul>
                <li>
                  <code>message.channels</code> — Messages in public channels.
                </li>
                <li>
                  <code>message.groups</code> — Messages in private channels.
                </li>
                <li>
                  <code>message.im</code> — Direct messages to the bot.
                </li>
                <li>
                  <code>app_mention</code> — When someone @mentions the bot.
                </li>
              </ul>
            </li>
            <li>
              Click <strong>Save Changes</strong>.
            </li>
          </ol>

          <h2>Step 4: Install the App to Your Workspace</h2>
          <ol>
            <li>
              Go to <strong>Install App</strong> in the left sidebar.
            </li>
            <li>
              Click <strong>Install to Workspace</strong>.
            </li>
            <li>
              Review the permissions and click <strong>Allow</strong>.
            </li>
            <li>
              Copy the <strong>Bot User OAuth Token</strong> that starts with{' '}
              <code>xoxb-</code>. This is the main token OpenClaw needs.
            </li>
          </ol>
          <p>
            You now have two tokens: the App-Level Token (<code>xapp-</code>) and the
            Bot User OAuth Token (<code>xoxb-</code>). Keep both handy.
          </p>

          <h2>Step 5: Configure OpenClaw</h2>
          <p>
            Open your OpenClaw configuration file — typically{' '}
            <code>openclaw.json</code> in your OpenClaw directory or{' '}
            <code>~/.openclaw/openclaw.json</code>.
          </p>
          <p>
            Add or update the <code>channels</code> section to include Slack:
          </p>
          <pre>
            <code>
{`{
  "channels": {
    "slack": {
      "enabled": true,
      "botToken": "xoxb-your-bot-token-here",
      "appToken": "xapp-your-app-token-here"
    }
  }
}`}
            </code>
          </pre>
          <p>Here is what each field does:</p>
          <ul>
            <li>
              <code>&quot;enabled&quot;: true</code> — Activates the Slack channel.
            </li>
            <li>
              <code>&quot;botToken&quot;</code> — The Bot User OAuth Token (
              <code>xoxb-</code>) from Step 4. This authenticates the bot.
            </li>
            <li>
              <code>&quot;appToken&quot;</code> — The App-Level Token (
              <code>xapp-</code>) from Step 3. This enables Socket Mode for real-time
              messaging.
            </li>
          </ul>

          <h2>Step 6: Start the Gateway and Test</h2>
          <p>
            With the configuration saved, start or restart the OpenClaw gateway:
          </p>
          <pre>
            <code>{`openclaw gateway restart`}</code>
          </pre>
          <p>
            Watch the logs for a Slack connection confirmation. You should see something
            like &quot;Slack channel connected&quot; or &quot;Socket Mode active.&quot;
          </p>
          <p>Now test the connection:</p>
          <ol>
            <li>
              Open your Slack workspace and invite the bot to a channel: type{' '}
              <code>/invite @YourBotName</code> in any channel.
            </li>
            <li>
              Send a message mentioning the bot: <code>@YourBotName Hey, are you
              there?</code>
            </li>
            <li>
              Wait a few seconds. The bot should respond in the channel or thread.
            </li>
            <li>
              You can also send a direct message to the bot — just find it in your DM
              list and type a message.
            </li>
          </ol>
          <p>
            If the bot responds, congratulations — your OpenClaw Slack integration is
            live.
          </p>

          <h2>Advanced Configuration</h2>
          <p>
            The basic setup gets you a working AI in Slack. Here are ways to make it
            more powerful.
          </p>

          <h3>Channel-Specific Behavior</h3>
          <p>
            Not every channel needs the same AI behavior. You might want the bot to:
          </p>
          <ul>
            <li>
              <strong>Actively respond</strong> in a #support or #questions channel —
              answering every message directed at it.
            </li>
            <li>
              <strong>Listen and summarize</strong> in a #general channel — only
              responding when explicitly mentioned.
            </li>
            <li>
              <strong>Run automations</strong> in a #ops channel — triggering workflows
              when certain keywords or patterns appear.
            </li>
          </ul>
          <p>
            OpenClaw skills let you define per-channel behavior. You can configure the AI
            persona, response triggers, and automation rules for each channel
            independently.
          </p>

          <h3>Custom Bot Identity</h3>
          <p>
            Give your AI assistant a name, avatar, and personality that fits your team
            culture. In the Slack app settings under <strong>Basic Information</strong>,
            you can:
          </p>
          <ul>
            <li>Set a display name and username.</li>
            <li>Upload a custom profile photo or avatar.</li>
            <li>Write a description so team members know what the bot does.</li>
          </ul>
          <p>
            In OpenClaw, you can configure the AI&apos;s persona through a{' '}
            <code>SOUL.md</code> file — defining its tone, expertise areas, and
            personality traits. This means your Slack bot can feel like a real team member
            rather than a generic chatbot.
          </p>

          <h3>Skills and Automations</h3>
          <p>
            OpenClaw&apos;s skill system lets you extend what the AI can do in Slack.
            Some popular skills for Slack workspaces include:
          </p>
          <ul>
            <li>
              <strong>Web search.</strong> Ask your AI to look up information without
              leaving Slack.
            </li>
            <li>
              <strong>File analysis.</strong> Send a PDF, spreadsheet, or image to the
              bot and ask it to summarize, extract data, or answer questions about the
              content.
            </li>
            <li>
              <strong>Code execution.</strong> Have the AI write and run code snippets,
              generate reports, or process data on the fly.
            </li>
            <li>
              <strong>CRM integration.</strong> Look up contacts, update deal stages, or
              log notes directly from Slack.
            </li>
            <li>
              <strong>Scheduled reports.</strong> Configure the AI to post daily
              summaries, metrics, or status updates to specific channels.
            </li>
          </ul>

          <h3>Multi-Channel Setup</h3>
          <p>
            OpenClaw is not limited to Slack. You can run Slack alongside{' '}
            <Link href="/blog/openclaw-whatsapp-setup/">WhatsApp</Link>,{' '}
            <Link href="/blog/openclaw-telegram-setup/">Telegram</Link>, Discord, and
            more. All channels share the same AI brain, skills, and context. A
            conversation you start in Slack can be continued on WhatsApp if you are away
            from your desk.
          </p>

          <h2>Security Best Practices</h2>
          <p>
            Connecting an AI to your team workspace requires thoughtful security. Here
            are the key things to get right:
          </p>
          <ul>
            <li>
              <strong>Limit channel access.</strong> Only invite the bot to channels
              where it is needed. Do not add it to sensitive HR, legal, or executive
              channels unless the AI specifically needs access.
            </li>
            <li>
              <strong>Store tokens securely.</strong> Never commit your{' '}
              <code>xoxb-</code> or <code>xapp-</code> tokens to a Git repository. Use
              environment variables or a secrets manager.
            </li>
            <li>
              <strong>Audit regularly.</strong> Review which channels the bot is in
              periodically. Remove it from channels where it is no longer needed.
            </li>
            <li>
              <strong>Self-hosted = your data.</strong> Because OpenClaw is self-hosted,
              your Slack messages are processed on your own server. They are not sent to
              a third-party SaaS platform — only to the AI model provider you choose
              (e.g., Anthropic for Claude, OpenAI for GPT).
            </li>
            <li>
              <strong>Rotate tokens.</strong> If you suspect a token has been
              compromised, regenerate it in the Slack app settings immediately and update
              your OpenClaw config.
            </li>
          </ul>

          <h2>Troubleshooting Common Issues</h2>

          <h3>Bot Does Not Respond</h3>
          <ul>
            <li>
              Make sure the bot is invited to the channel. Type{' '}
              <code>/invite @YourBotName</code> in the channel.
            </li>
            <li>
              Verify both tokens (<code>xoxb-</code> and <code>xapp-</code>) are
              correct in your config.
            </li>
            <li>
              Check the OpenClaw gateway logs for errors:{' '}
              <code>openclaw gateway logs</code>.
            </li>
            <li>
              Make sure Socket Mode is enabled in the Slack app settings.
            </li>
            <li>
              Confirm the event subscriptions (<code>message.channels</code>,{' '}
              <code>message.im</code>, etc.) are set up.
            </li>
          </ul>

          <h3>Bot Responds Slowly</h3>
          <ul>
            <li>
              Check your server resources. OpenClaw needs enough CPU and memory to
              process requests quickly.
            </li>
            <li>
              The AI model response time is often the bottleneck. Faster models or
              shorter prompts can help.
            </li>
            <li>
              If you are on a{' '}
              <Link href="/blog/openclaw-vps-setup-guide/">VPS</Link>, make sure the
              server is in a region close to Slack&apos;s infrastructure (US or EU).
            </li>
          </ul>

          <h3>Permission Errors</h3>
          <ul>
            <li>
              If you see &quot;missing_scope&quot; errors, go back to{' '}
              <strong>OAuth &amp; Permissions</strong> in your Slack app settings and add
              the missing scope.
            </li>
            <li>
              After adding new scopes, you need to <strong>reinstall the app</strong> to
              the workspace for the changes to take effect.
            </li>
          </ul>

          <h3>Socket Mode Connection Drops</h3>
          <ul>
            <li>
              Make sure your server has a stable internet connection.
            </li>
            <li>
              OpenClaw automatically reconnects when the socket drops. Check the logs to
              confirm reconnection is happening.
            </li>
            <li>
              If drops are frequent, check your server firewall — outbound WebSocket
              connections on port 443 need to be allowed.
            </li>
          </ul>

          <h2>Real-World Use Cases</h2>
          <p>
            Once your OpenClaw Slack integration is running, here are some ways teams use
            it:
          </p>
          <ul>
            <li>
              <strong>Instant IT support.</strong> Employees ask the AI common IT
              questions — password resets, software access, VPN setup guides — and get
              instant answers without waiting for the help desk.
            </li>
            <li>
              <strong>Sales enablement.</strong> Sales reps ask the AI to look up
              prospect information, draft follow-up emails, or generate talking points
              before a call, all without leaving Slack.
            </li>
            <li>
              <strong>Engineering assistant.</strong> Developers ask the AI to explain
              code, debug errors, write documentation, or generate boilerplate — right in
              the #engineering channel.
            </li>
            <li>
              <strong>Meeting summaries.</strong> After a meeting, paste the notes or
              transcript into Slack and ask the AI to generate action items, summaries, or
              follow-up tasks.
            </li>
            <li>
              <strong>Onboarding buddy.</strong> New hires can ask the AI company-specific
              questions — &quot;Where do I find the brand guidelines?&quot; or &quot;What
              is the PTO policy?&quot; — and get instant, accurate answers.
            </li>
          </ul>
          <p>
            Companies across major tech hubs — from{' '}
            <Link href="/cities/san-francisco/">San Francisco</Link> to{' '}
            <Link href="/cities/austin/">Austin</Link> to{' '}
            <Link href="/cities/new-york-city/">New York</Link>{' '}
            — are using OpenClaw with Slack to give their teams an AI-powered edge.
          </p>

          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2>What&apos;s Next?</h2>
          <p>
            You now have a fully working OpenClaw Slack integration. Your team has an AI
            assistant available 24/7, right where they already work. Here are some next
            steps to get even more value:
          </p>
          <ul>
            <li>
              <Link href="/blog/openclaw-whatsapp-setup/">
                Add WhatsApp as a mobile channel
              </Link>{' '}
              so you can message your AI on the go.
            </li>
            <li>
              <Link href="/blog/openclaw-telegram-setup/">
                Set up Telegram
              </Link>{' '}
              for a lightweight, cross-platform alternative.
            </li>
            <li>
              Explore OpenClaw skills to add web search, file analysis, code execution,
              and more to your Slack AI.
            </li>
            <li>
              <Link href="/blog/openclaw-small-business-automation/">
                Read about OpenClaw for small business automation
              </Link>{' '}
              to see more ways to put your AI to work.
            </li>
          </ul>

          <h2>Need Help Setting Up Slack?</h2>
          <p>
            The Slack integration is one of the most popular OpenClaw channels, and for
            good reason — it puts AI directly into your team&apos;s workflow. But every
            workspace is different, and getting permissions, scopes, and configuration
            right can be tricky.
          </p>
          <p>
            If you want someone to handle the setup for you,{' '}
            <Link href="/blog/openclaw-setup-service/">
              our professional setup service
            </Link>{' '}
            includes full Slack configuration. We will create the app, configure
            permissions, connect it to your OpenClaw instance, and test it — all in a
            30-minute call while you watch.
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
            <h3>Ready to add AI to your Slack workspace?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Book a free 30-minute call and we&apos;ll set everything up for you —
              Slack app, permissions, skills, the works.
            </p>
            <a
              href={BUSINESS.calendly.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background:
                  'linear-gradient(135deg, var(--accent) 0%, #ff8855 100%)',
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
