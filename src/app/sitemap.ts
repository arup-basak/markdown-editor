import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowprint.app";

  const routes = [
    {
      path: "",
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/pricing",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/changelog",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
