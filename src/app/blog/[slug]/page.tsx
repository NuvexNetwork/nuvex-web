import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SlideUp } from "@/components/animations/SlideUp";
import { BlogCard } from "@/components/cards/BlogCard";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { blogPage, blogPosts, getBlogPost, otherBlogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const more = otherBlogPosts(post.slug);

  return (
    <>
      <ArticleLayout
        title={post.title}
        meta={post.milestone}
        author={post.author}
        category={post.category}
        image={post.image}
        sections={post.sections}
      />
      <Section spacing="none" className="pb-[var(--section-y)]" aria-labelledby="more-posts-title">
        <SectionTitle id="more-posts-title" title="More posts" align="left" />
        <SlideUp>
          <CellGrid className="grid-cols-1 sm:grid-cols-2">
            {more.map((other) => (
              <BlogCard
                key={other.slug}
                href={`/blog/${other.slug}`}
                title={other.title}
                excerpt={other.excerpt}
                meta={other.milestone}
                author={other.author}
                category={other.category}
                image={other.image}
              />
            ))}
          </CellGrid>
        </SlideUp>
      </Section>
      <CtaBanner
        title={blogPage.cta.title}
        accent={blogPage.cta.accent}
        action={blogPage.cta.action}
      />
    </>
  );
}
