"use client";

import * as React from "react";
import { Loader2, Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImageUrl: "",
    published: false,
  });

  const fetchPosts = React.useCallback(() => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then(async (res) => {
        if (res.status === 403) {
          window.location.href = "/admin/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPosts(data.posts ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        toast({ title: "Couldn't create post", description: data.error, variant: "destructive" });
        return;
      }
      toast({ title: "Post created", variant: "success" });
      setShowForm(false);
      setForm({ title: "", slug: "", excerpt: "", content: "", coverImageUrl: "", published: false });
      fetchPosts();
    } finally {
      setSubmitting(false);
    }
  }

  function slugify(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Blog Posts</h1>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-forest-100 bg-white p-6"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))
              }
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              required
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="coverImageUrl">Cover Image URL (optional)</Label>
            <Input
              id="coverImageUrl"
              value={form.coverImageUrl}
              onChange={(e) => setForm((f) => ({ ...f, coverImageUrl: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="content">Content (HTML)</Label>
            <textarea
              id="content"
              rows={8}
              required
              className="w-full rounded-xl border border-forest-100 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Publish immediately
          </label>
          <Button type="submit" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Post"}
          </Button>
        </form>
      )}

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-leaf-600" />
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-2xl border border-forest-100 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  {post.published ? (
                    <CheckCircle2 className="h-4 w-4 text-leaf-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-ink-muted" />
                  )}
                  <p className="font-semibold text-ink">{post.title}</p>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{post.excerpt}</p>
              </div>
              <span className="text-xs text-ink-muted">
                {new Date(post.createdAt).toLocaleDateString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
