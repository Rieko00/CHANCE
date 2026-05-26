'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Scan, FileText, User, Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/mode-toggle';

const navLinks = [
  { href: '/', label: 'Home', icon: null },
  { href: '/scan', label: 'Scan', icon: Scan },
  { href: '/download', label: 'Download', icon: Download },
  { href: '/about', label: 'About', icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-brand">
          <Link href="/" className="header-brand">
            <Image
              src="/Logowithword.png"
              alt="CHANCE – Chest Automated Nodule Detection for Early Screening"
              width={220}
              height={50}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>

        <nav className="header-nav">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'active' : ''}`}
            >
              {Icon && <Icon size={16} />} {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-badge">
            <span className="status-dot" />
            v1.0.0
          </div>
          <div className="header-divider" />

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="icon-btn" title="Profile">
                <User size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={12}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem style={{ color: 'var(--danger)' }}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
