// ============================================================
// Legacy Vault — Articles Page
// Blog-style article listing
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { articles } from "@/data/mock-data";

export default function ArticlesPage() {
  const publishedArticles = articles.filter((a) => a.isPublished);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Latest <span className="text-gradient-gold">Articles</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg">
          News, guides, and behind-the-scenes content from the Legacy Vault
          team.
        </p>
      </div>

      {/* Featured Article (first) */}
      {publishedArticles.length > 0 && (
        <Link
          href={`/articles/${publishedArticles[0].slug}`}
          className="group block mb-10"
        >
          <div className="relative rounded-xl overflow-hidden border border-border/50 hover:border-gold/30 transition-colors">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-video md:aspect-auto md:min-h-[320px]">
                <Image
                  src={publishedArticles[0].imageUrl}
                  alt={publishedArticles[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-xs text-gold font-medium uppercase tracking-wider mb-2">
                  Featured Article
                </span>
                <h2 className="text-xl md:text-2xl font-bold group-hover:text-gold transition-colors">
                  {publishedArticles[0].title}
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-3">
                  {publishedArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(
                      publishedArticles[0].publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gold font-medium">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedArticles.slice(1).map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group flex flex-col rounded-xl overflow-hidden border border-border/50 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 bg-card">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-2">
                <Calendar className="h-3 w-3" />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-3">
                <span className="text-xs text-gold font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
