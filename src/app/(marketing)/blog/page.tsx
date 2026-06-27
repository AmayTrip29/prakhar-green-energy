import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog — Solar Insights & Guides",
  description: "Guides, price breakdowns, and insights on rooftop solar in India from the Prakhar Green Energy Solutions team.",
};

export const revalidate = 3600; // re-fetch published posts at most once per hour

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImageUrl: true,
      authorName: true,
      publishedAt: true,
    },
  });

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Solar Insights &amp; Guides
          </h1>
          <p className="mt-4 text-base text-ink-muted">
            Practical guides on rooftop solar, subsidies, and system maintenance.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-ink-muted">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-forest-100 bg-white transition-shadow hover:shadow-lift"
              >
                <div className="relative h-48 w-full overflow-hidden bg-leaf-50">
                  {post.coverImageUrl && (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-base font-bold leading-snug text-ink line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {post.authorName}
                    </span>
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
