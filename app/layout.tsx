import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gesture Chord Player",
  description: "Gesture-controlled musical chord player using MediaPipe and Web Audio."
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