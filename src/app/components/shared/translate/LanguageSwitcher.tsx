'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { setCookie } from 'cookies-next';
import { useTransition } from 'react';

const locales = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'ar', label: '🇸🇦 العربية' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Store in cookies
    setCookie('NEXT_LOCALE', newLocale, { path: '/' });

    // Navigate
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {locales.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-700 dark:text-gray-300">
        ▼
      </div>
    </div>
  );
}
