import type { Metadata, Viewport } from "next";
import "./globals.css";
import { VisitTracker } from "@/components/site/visit-tracker";
import { defaultConfig } from "@/lib/config";
import { defaultSeoSettings } from "@/lib/settings";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.site.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultSeoSettings.defaultTitle,
    template: "%s | Leandro Guincho",
  },
  description: defaultSeoSettings.defaultDescription,
  keywords: [
    "guincho Ituiutaba",
    "auto socorro Ituiutaba",
    "guincho 24h Ituiutaba",
    "reboque Ituiutaba",
    "guincho 24 horas",
    "socorro mecânico Ituiutaba",
    "transporte de veículo Ituiutaba",
  ],
  authors: [{ name: "Leandro Guincho" }],
  creator: "Leandro Guincho",
  publisher: "Leandro Guincho",
  applicationName: "Leandro Guincho",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  category: "AutomotiveBusiness",
  formatDetection: { telephone: false, address: false, email: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/assets/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/images/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/images/brand/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Leandro Guincho",
    title: defaultSeoSettings.defaultTitle,
    description: defaultSeoSettings.defaultDescription,
    images: [
      {
        url: defaultSeoSettings.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Leandro Guincho — Auto Socorro 24h em Ituiutaba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoSettings.defaultTitle,
    description: defaultSeoSettings.defaultDescription,
    images: [defaultSeoSettings.defaultOgImage],
  },
  verification: {
    google: defaultSeoSettings.googleVerification || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#120a13",
  colorScheme: "light",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Inter font — matches the original site's font-family declaration. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;850;900;950&display=swap"
        />
        {/* Google Tag Manager — placed in head per GTM spec. */}
        {GTM_ID ? (
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: GTM snippet
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : null}
        {/* Google Analytics 4 — gtag.js. */}
        {GA_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              // biome-ignore lint/security/noDangerouslySetInnerHtml: GA snippet
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body data-page="home" data-whatsapp={defaultConfig.site.whatsapp}>
        {/* Original CSS — preserved verbatim from PHP site for visual fidelity. */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* Original JS — sticky header, mobile menu, reveal, geolocation, lightbox, etc. */}
        <script src="/assets/js/app.js" defer />
        {GTM_ID ? (
          // GTM noscript fallback.
          <noscript
            // biome-ignore lint/security/noDangerouslySetInnerHtml: GTM noscript iframe
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe>`,
            }}
          />
        ) : null}
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
