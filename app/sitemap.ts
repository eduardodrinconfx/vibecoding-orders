import { MetadataRoute } from 'next'
import { businessConfig } from '@/lib/business-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = businessConfig.urls.website

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/pedido`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
}
