import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { solutionSlugs } from "@/lib/solutions-data";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/careers",
    "/faq",
    "/blog",
    "/cities",
    "/prakhar-shield",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const solutionRoutes = solutionSlugs.map((slug) => ({
    url: `${siteConfig.url}/solutions/${slug}`,
    lastModified: new Date(),
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes];
}
