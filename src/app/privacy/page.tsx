import { LegalPage } from "@/components/content/LegalPage";
import { legalUpdated, privacy } from "@/data/legal";

export const metadata = {
  title: "Privacy",
  description:
    "The Nuvex website is statically rendered and collects nothing: no analytics, no advertising, no tracking cookies, no accounts, and no storage of anything typed into the contact form.",
};

export default function PrivacyPage() {
  return <LegalPage title={privacy.title} updated={legalUpdated} sections={privacy.sections} />;
}
