import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PsyMatch",
  description: "Linha do tempo da psicologia comportamental em formato de match.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

