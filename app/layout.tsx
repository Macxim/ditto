import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ditto — design to code studies",
  description: "Reproducing designs in code, one shot at a time.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}