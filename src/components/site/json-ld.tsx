/**
 * Renders a `<script type="application/ld+json">` tag with the given data.
 * Server component — safe to use anywhere.
 */
type JsonLdProps = {
  data: unknown;
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local JSON-LD only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
