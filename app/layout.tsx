import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contador de Formatura · 17.12.2026",
  description:
    "Contagem regressiva para o fim do semestre 2026/2 e para a colação de grau: dias, horas, minutos e segundos em tempo real.",
  keywords: [
    "contador",
    "formatura",
    "colação de grau",
    "contagem regressiva",
    "semestre",
  ],
  openGraph: {
    title: "Contador de Formatura · 17.12.2026",
    description:
      "Faltam poucos dias para o fim do semestre. Acompanhe cada segundo até a colação de grau.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
