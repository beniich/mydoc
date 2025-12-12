'use client';

import Link from 'next/link';

import { useAuth } from '@/libs/AuthContext';
import { ActiveLink } from '@/components/ActiveLink';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ToggleMenuButton } from '@/components/ToggleMenuButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/templates/Logo';

export const DashboardHeader = (props: {
  menu: {
    href: string;
    label: string;
  }[];
}) => {
  const { user, signOut } = useAuth();

  return (
    <>
      <div className="flex items-center">
        <Link href="/dashboard" className="max-sm:hidden">
          <Logo />
        </Link>

        <svg
          className="size-8 stroke-muted-foreground max-sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M17 5 7 19" />
        </svg>

        {/* Organization Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
            {user?.organization?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || 'W'}
          </div>
          <span className="text-sm font-medium max-w-28 sm:max-w-52 truncate">
            {user?.organization || 'Mon Espace'}
          </span>
        </div>

        <nav className="ml-3 max-lg:hidden">
          <ul className="flex flex-row items-center gap-x-3 text-lg font-medium [&_a:hover]:opacity-100 [&_a]:opacity-75">
            {props.menu.map(item => (
              <li key={item.href}>
                <ActiveLink href={item.href}>{item.label}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <ul className="flex items-center gap-x-1.5 [&_li[data-fade]:hover]:opacity-100 [&_li[data-fade]]:opacity-60">
          <li data-fade>
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ToggleMenuButton />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {props.menu.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>

          <li data-fade>
            <LocaleSwitcher />
          </li>

          <li>
            <Separator orientation="vertical" className="h-4" />
          </li>

          {/* User Menu */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm text-white font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium max-sm:hidden">{user?.name || 'Utilisateur'}</span>
                  <svg className="w-4 h-4 opacity-50 max-sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user-profile" className="cursor-pointer">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/workflows" className="cursor-pointer">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Mes workflows
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </>
  );
};
