// ============================================================
// Legacy Vault — Article Detail Page
// Full article content view
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, articles } from "@/data/mock-data";
import { notFound } from "next/navigation";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // Get other articles for "More Articles" section
  const otherArticles = articles
    .filter((a) => a.id !== article.id && a.isPublished)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3" />
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {article.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 mb-8">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => {
            // Handle bold headers
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2">
                  {paragraph.replace(/\*\*/g, "")}
                </h3>
              );
            }
            // Handle bold-prefixed lines
            if (paragraph.startsWith("**")) {
              const parts = paragraph.split("**");
              return (
                <div key={i} className="mb-4">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-foreground font-semibold">
                        {part}
                      </strong>
                    ) : (
                      <span key={j} className="text-muted-foreground">
                        {part}
                      </span>
                    )
                  )}
                </div>
              );
            }
            // Handle list items
            if (paragraph.includes("\n- ")) {
              const lines = paragraph.split("\n");
              return (
                <div key={i} className="mb-4">
                  {lines.map((line, j) =>
                    line.startsWith("- ") ? (
                      <div
                        key={j}
                        className="flex items-start gap-2 text-sm text-muted-foreground ml-4 mb-1"
                      >
                        <span className="text-gold mt-0.5">•</span>
                        {line.slice(2)}
                      </div>
                    ) : (
                      <p
                        key={j}
                        className="text-sm text-muted-foreground mb-2"
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              );
            }
            // Regular paragraph
            return (
              <p
                key={i}
                className="text-sm text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-xl border border-gold/20 bg-gold/5 text-center">
          <p className="font-semibold text-foreground">
            Looking for extended art prints?
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Browse our complete collection of hand-drawn designs.
          </p>
          <Link href="/list-product">
            <Button className="mt-4 bg-gold hover:bg-gold-light text-white font-semibold gap-2">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </article>

      {/* More Articles */}
      {otherArticles.length > 0 && (
        <section className="max-w-3xl mx-auto mt-16">
          <Separator className="mb-8 bg-border/50" />
          <h2 className="text-xl font-bold mb-6">
            More <span className="text-gradient-gold">Articles</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {otherArticles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-border/50 hover:border-gold/30 transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-3 bg-card">
                  <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-gold transition-colors">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
