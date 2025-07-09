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
        {/* Header with logo */}
        <header className="fixed top-0 left-0 z-50 p-6">
          <a
            href="https://eleventyfirstparallel.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/eplogo.webp"
              alt="Company Logo"
              className="h-24 w-auto filter drop-shadow-lg"
            />
          </a>
        </header>
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}
