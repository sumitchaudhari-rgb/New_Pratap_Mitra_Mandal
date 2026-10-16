import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.volunteer' });
  return { title: t('title') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.volunteer' });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 animate-fade-in-up">
      <h1 className="deva-heading text-3xl font-bold">{t('title')}</h1>
      <p className="deva-body mt-2 text-muted-foreground">{t('description')}</p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        🔜 Phase 6 मध्ये येईल
      </div>
    </div>
  );
}
