import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import clsx from "clsx";

import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";

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
      <head>
        <Script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
      </head>
      <ThemeProvider>
        <body
          className={clsx(
            "bg-indygo-200 text-gray-900 dark:text-white transition-colors",
            inter.className,
          )}
        >
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}

const themeInit = `
(function () {
  function getInitialTheme() {
    if (window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme");
      if (typeof storedTheme === "string") {
        return storedTheme;
      }
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  const theme = getInitialTheme();
  const root = document.documentElement;

  root.classList.add(theme);
})()`;
