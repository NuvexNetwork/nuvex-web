import { LegalPage } from "@/components/content/LegalPage";
import { legalUpdated, terms } from "@/data/legal";

export const metadata = {
  title: "Terms",
  description:
    "Nuvex is Apache-2.0 software with nothing deployed to mainnet and no independent audit. Nothing on this site is financial advice or an offer, and every console visual is an illustration.",
};

export default function TermsPage() {
  return <LegalPage title={terms.title} updated={legalUpdated} sections={terms.sections} />;
}
