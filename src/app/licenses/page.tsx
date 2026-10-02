import { UtilityGrid, UtilityPage } from "@/components/content/UtilityPage";
import { Cell } from "@/components/ui/Cell";
import { SmartLink } from "@/components/ui/SmartLink";
import { licences } from "@/data/legal";

export const metadata = {
  title: "Licences",
  description:
    "Nuvex is Apache-2.0. This page lists the website's runtime dependencies and their licences, the Inter Tight typeface, and credits for the photographs it uses.",
};

function Row({
  heading,
  body,
  children,
}: {
  heading: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <Cell className="grid grid-cols-1 gap-6 p-[30px] md:grid-cols-[220px_1fr] md:gap-10">
      <h2 className="t-h6 text-fg">{heading}</h2>
      <div className="flex flex-col gap-5">
        <p className="max-w-[620px]">{body}</p>
        {children}
      </div>
    </Cell>
  );
}

export default function LicensesPage() {
  return (
    <UtilityPage title={licences.title} accent={licences.accent} lead={licences.lead}>
      <UtilityGrid>
        <Row heading={licences.protocol.heading} body={licences.protocol.body}>
          <SmartLink
            href={licences.protocol.link.href}
            className="text-sm text-fg underline-offset-4 hover:underline"
          >
            {licences.protocol.link.label}
          </SmartLink>
        </Row>

        <Row heading={licences.runtime.heading} body={licences.runtime.body}>
          <ul className="flex flex-col">
            {licences.runtime.items.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-1 gap-1.5 border-t border-line py-4 first:border-t-0 first:pt-0 sm:grid-cols-[220px_90px_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="t-small font-mono text-fg">
                  {item.name} {item.version}
                </span>
                <span className="t-small text-fg-soft">{item.licence}</span>
                <span className="t-small text-muted">{item.note}</span>
              </li>
            ))}
          </ul>
        </Row>

        <Row heading={licences.font.heading} body={licences.font.body}>
          <SmartLink
            href={licences.font.link.href}
            className="text-sm text-fg underline-offset-4 hover:underline"
          >
            {licences.font.link.label}
          </SmartLink>
        </Row>

        <Row heading={licences.photos.heading} body={licences.photos.body}>
          <ul className="flex flex-col">
            {licences.photos.items.map((photo) => (
              <li
                key={photo.file}
                className="flex flex-col gap-1.5 border-t border-line py-4 first:border-t-0 first:pt-0"
              >
                <span className="t-small font-mono text-fg">{photo.file}</span>
                <span className="t-small text-muted">{photo.alt}</span>
                <SmartLink
                  href={photo.credit.href}
                  className="t-small text-fg underline underline-offset-2"
                >
                  Photo: {photo.credit.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </Row>

        <Row heading={licences.assets.heading} body={licences.assets.body} />
        <Row heading={licences.standards.heading} body={licences.standards.body} />
      </UtilityGrid>
    </UtilityPage>
  );
}
