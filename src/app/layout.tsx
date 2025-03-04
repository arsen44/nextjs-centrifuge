import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-phone-number-input/style.css";
import { UIProviders } from "./uiproviders";
import { ReduxProvider } from "./reduxProvider";
import { AxiosInterceptor } from "./components/auth/AxiosInterceptor";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Roxo Delivery | Быстрая доставка",
  description: "Roxo Delivery - ваш надежный партнер для быстрой и качественной доставки.",
  keywords: "доставка, быстрая доставка, Roxo Delivery, доставка на дом, доставка товаров, Яндекс доставка",
  verification: {
    google: "cYrwHE1ewkS-PeJDQypF50t8Mwgpri9l9y6CbEZ8lTw",
    yandex: "63903ecae42b5fb9",
  },
  openGraph: {
    title: "Roxo Delivery",
    description: "Ваш лучший выбор для быстрой доставки.",
    url: "https://roxodev.ru",
    type: "website",
    images: [
      {
        url: "favicon.ico",
        width: 1200,
        height: 630,
        alt: "Roxo Delivery logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <AxiosInterceptor>
            <UIProviders>{children}</UIProviders>
          </AxiosInterceptor>
        </ReduxProvider>
      </body>
    </html>
  );
}
