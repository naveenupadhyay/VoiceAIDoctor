import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Health Assistant",
  description:
    "Connect with your personal AI doctor for instant health consultations and medical guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="gradient-bg antialiased">
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}
