import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { businessConfig } from "@/lib/business-config"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
}

export const metadata: Metadata = {
  metadataBase: new URL(businessConfig.urls.website),
  title: {
    default: businessConfig.seo.title,
    template: `%s | ${businessConfig.name}`,
  },
  description: businessConfig.seo.description,
  keywords: businessConfig.seo.keywords,
  openGraph: {
    type: "website",
    locale: "es_VE",
    title: businessConfig.seo.title,
    description: businessConfig.seo.description,
    siteName: businessConfig.name,
  },
  twitter: {
    card: "summary",
    title: businessConfig.seo.title,
    description: businessConfig.seo.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: businessConfig.name,
  description: businessConfig.seo.description,
  url: businessConfig.urls.website,
  telephone: businessConfig.contact.phone,
  email: businessConfig.contact.email,
  servesCuisine: "Cafetería, Restaurante, Venezuelan",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: businessConfig.address.street,
    addressLocality: businessConfig.address.city,
    addressRegion: businessConfig.address.state,
    postalCode: businessConfig.address.postalCode,
    addressCountry: "VE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: businessConfig.geo.latitude,
    longitude: businessConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "24:00",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
