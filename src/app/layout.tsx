import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sukaj Construction",
  description: "Residential developer in Tirana, Albania.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
