'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Scan, FileText, User, Download, Menu, X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
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

          <button 
            className="icon-btn mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
    </div>
  );
}
