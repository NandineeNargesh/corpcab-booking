'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const showNavBar = pathname !== '/sign-up' && pathname !== '/sign-in';
  return showNavBar ? <NavBar /> : null;
}
