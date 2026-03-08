import { Head, Html, Main, NextScript } from 'next/document';

import { ANALYTICS } from '@/config/analytics';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics - inline for static export (next/script afterInteractive doesn't work without a server) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.google.ga4MeasurementId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS.google.ga4MeasurementId}');
              gtag('config', '${ANALYTICS.google.measurementId}');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
