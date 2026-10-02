import type { Metadata } from "next";

import { SlideUp } from "@/components/animations/SlideUp";
import { BlogCard } from "@/components/cards/BlogCard";
import { StackedCard } from "@/components/cards/StackedCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageBanner } from "@/components/sections/PageBanner";
import { CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { featuredPost, remainingPosts, blogPage } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Nuvex protocol repository: how VRF proofs are verified on-chain, why a node is eligible, what max_fee does not do, and the limitations the records keep in writing.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageBanner
        tag={blogPage.tag}
        title={blogPage.title}
        accent={blogPage.accent}
        lead={blogPage.lead}
        titleWidth={700}
      />
      <Section spacing="none" className="pb-[var(--section-y)]" aria-label="All posts">
        {featuredPost?.image ? (
          <div className="mb-10">
            <StackedCard
              href={`/blog/${featuredPost.slug}`}
              label={featuredPost.category}
              title={featuredPost.title}
              image={featuredPost.image.src}
              alt={featuredPost.image.alt}
              cta="Read the post"
            />
          </div>
        ) : null}
        <SlideUp>
          <CellGrid className="grid-cols-1 sm:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                meta={post.milestone}
                author={post.author}
                category={post.category}
                image={post.image}
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
