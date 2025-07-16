import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prada - Portfolio | Engineer & Modelador 3D",
  description:
    "Portfolio profissional de Fabio de Almeida (Prada) - Engineer & Modelador 3D especializado em FiveM. Criando experiências visuais únicas para servidores de roleplay.",
  keywords: "Prada, Fabio de Almeida, Modelador 3D, FiveM, MLO, Engineer, Portfolio, Style Group",
  authors: [{ name: "Fabio de Almeida (Prada)" }],
  creator: "Prada - Style Group",
  openGraph: {
    title: "Prada - Portfolio | Engineer & Modelador 3D",
    description: "Portfolio profissional de Fabio de Almeida (Prada) - Engineer & Modelador 3D especializado em FiveM.",
    url: "https://prada-portfolio.vercel.app",
    siteName: "Prada Portfolio",
    images: [
      {
        url: "https://imgur.com/3jwalmw.jpg",
        width: 1200,
        height: 630,
        alt: "Prada - Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prada - Portfolio | Engineer & Modelador 3D",
    description: "Portfolio profissional de Fabio de Almeida (Prada) - Engineer & Modelador 3D especializado em FiveM.",
    images: ["https://imgur.com/3jwalmw.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
