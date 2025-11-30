import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar5 } from "@/src/components/Navbar";
import { Toaster } from "sonner";
import NextauthProvider from "@/src/providers/nextauth.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note App",
  description: "A simple and secure note-taking app with authentication, easy management, and fast access to your notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextauthProvider>
          <Toaster />
          <Navbar5 />
          {children}
        </NextauthProvider>
      </body>
    </html>
  );
}
