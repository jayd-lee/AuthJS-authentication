import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth",
  description: "An auth application",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={cn("min-h-screen", inter.className)}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
