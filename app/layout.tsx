import type React from "react"
import "./globals.css"
import { Delius_Swash_Caps } from "next/font/google";

const delius = Delius_Swash_Caps({
  weight: ["400"], // Delius Swash Caps only has 400 weight
  subsets: ["latin"],
  display: "swap",
  variable: "--font-delius",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${delius.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

