import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const title =
  "Free One-to-One Consultation for Online Store Owners | Digital Bibash";
const description =
  "Book a free one-to-one consultation and get a customized digital marketing strategy for your online store.";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalbibash.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Digital Bibash",
    images: [
      {
        url: "/logo.png",
        alt: "Digital Bibash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFDF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
