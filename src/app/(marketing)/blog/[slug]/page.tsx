import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, published: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.authorName}
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {post.coverImageUrl && (
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
              <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <div
            className="prose prose-forest mt-8 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink-muted prose-p:leading-relaxed prose-a:text-leaf-700"
            // Content is authored exclusively through the admin panel by
            // Prakhar's own editorial team — not user-submitted — so
            // rendering as HTML here is safe. If this ever accepts
            // third-party input, sanitize with a library like DOMPurify first.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
