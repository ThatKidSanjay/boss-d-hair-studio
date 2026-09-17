import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bossdhairstudio.com"),
  title: {
    default: "Boss D Hair Studio | Premium Hair & Beauty in Malolos, Bulacan",
    template: "%s | Boss D Hair Studio",
  },
  description:
    "Boss D Hair Studio — premium hair styling, treatments, and beauty services in Malolos, Bulacan. Signature cuts, professional styling, and elevated salon experiences.",
  keywords: [
    "hair salon",
    "Malolos",
    "Bulacan",
    "hair studio",
    "haircut",
    "hair styling",
    "hair treatment",
    "premium salon",
    "Boss D",
  ],
  authors: [{ name: "Boss D Hair Studio" }],
  creator: "Boss D Hair Studio",
  publisher: "Boss D Hair Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://bossdhairstudio.com",
    siteName: "Boss D Hair Studio",
    title: "Boss D Hair Studio | Premium Hair & Beauty",
    description:
      "Premium hair styling, treatments, and beauty services in Malolos, Bulacan. Experience the Boss D standard.",
    images: [
      {
        url: "/image/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Boss D Hair Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boss D Hair Studio | Premium Hair & Beauty",
    description:
      "Premium hair styling, treatments, and beauty services in Malolos, Bulacan.",
    images: ["/image/hero/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Structured data for local business (SEO)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Boss D Hair Studio",
  description:
    "Premium hair styling and beauty services in Malolos, Bulacan.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4097 Gumamela Street, Purok 4, Cofradia",
    addressLocality: "City of Malolos",
    addressRegion: "Bulacan",
    postalCode: "3000",
    addressCountry: "PH",
  },
  telephone: "+63 912 345 6789",
  openingHours: "Mo-Sa 09:00-20:00",
  priceRange: "₱₱",
  image: "/image/hero/hero.jpg",
  url: "https://bossdhairstudio.com",
  sameAs: ["https://facebook.com", "https://instagram.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bdhs-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}