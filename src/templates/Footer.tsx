import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { CenteredFooter } from '@/features/landing/CenteredFooter';
import { Section } from '@/features/landing/Section';
import { AppConfig } from '@/utils/AppConfig';

import { Logo } from './Logo';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <Section className="pb-16 pt-0">
      <CenteredFooter
        logo={<Logo />}
        name={AppConfig.name}
        iconList={(
          <>
            {/* n8n integration icon */}
            <li>
              <Link href="/dashboard/workflows" title="Workflows">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
          </>
        )}
        legalLinks={(
          <>
            <li>
              <Link href="/terms">{t('terms_of_service')}</Link>
            </li>
            <li>
              <Link href="/privacy">{t('privacy_policy')}</Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="/dashboard">{t('product')}</Link>
        </li>

        <li>
          <Link href="/dashboard/workflows">{t('docs')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('community')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('company')}</Link>
        </li>
      </CenteredFooter>
    </Section>
  );
};
