import { PageBanner } from "@/components/sections/PageBanner";
import { notFoundPage } from "@/data/company";

export const metadata = {
  title: "Page not found",
  description: "That page does not exist on the Nuvex website.",
};

export default function NotFound() {
  return (
    <PageBanner
      tag={notFoundPage.tag}
      title={notFoundPage.title}
      lead={notFoundPage.lead}
      primary={notFoundPage.primary}
      secondary={notFoundPage.secondary}
      width={620}
      titleWidth={560}
    />
  );
}
