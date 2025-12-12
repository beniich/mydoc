import type { OrgPermission, OrgRole } from '@/types/Auth';

// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');

// eslint-disable-next-line ts/consistent-type-definitions
type IntlMessages = Messages;

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface ClerkAuthorization {
    permission: OrgPermission;
    role: OrgRole;
  }
}
