import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('homePage');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl">{t('title')}</h1>
    </div>
  );
}
