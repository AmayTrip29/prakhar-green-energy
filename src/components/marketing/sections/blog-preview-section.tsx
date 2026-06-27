import Link from "next/link";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function BlogPreviewSection() {
  let posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    coverImageUrl: string | null;
    authorName: string;
    publishedAt: Date | null;
  }> = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImageUrl: true,
        authorName: true,
        publishedAt: true,
      },
    });
  } catch {
    // Database may be unavailable at build time in some environments —
    // fail gracefully rather than breaking the whole homepage.
    posts = [];
  }

  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Latest From Our Blog
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Solar Insights &amp; Guides
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-forest-100 bg-white transition-shadow hover:shadow-lift"
            >
              <div className="relative h-44 w-full overflow-hidden bg-leaf-50">
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
                <h3 className="font-display text-base font-bold leading-snug text-ink line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
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
      </div>
    </section>
  );
}
