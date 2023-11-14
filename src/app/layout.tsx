import type { Metadata } from "next";
import { Inter } from "next/font/google";

import clsx from "clsx";

import { Footer } from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BigDevSoon - Calculator Project",
  other: {
    bds: "<bds />",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          // "bg-background text-black-87 body",
          inter.className,
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
