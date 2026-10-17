import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { ibrFormPages, formName } from "@/lib/ibr-forms";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return ibrFormPages().map((f) => ({ form: f.slug }));
}

export default async function Image(props: PageProps<"/ibr/forms/[form]">) {
  const { form } = await props.params;
  const f = ibrFormPages().find((p) => p.slug === form)!;
  const title = f.old ? `IBR ${formName(f)} (formerly ${f.old.form})` : `IBR ${formName(f)}`;
  return renderOgImage({ title, description: `${f.title}. ${f.summary}` });
}
