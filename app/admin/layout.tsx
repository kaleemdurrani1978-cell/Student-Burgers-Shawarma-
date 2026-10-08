'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Flame,
  QrCode,
  CheckSquare,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin chrome
  if (pathname === '/admin/login' || pathname.startsWith('/admin/tables/print/')) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/menu', label: 'Products', icon: UtensilsCrossed },
    { href: '/admin/deals', label: 'Deals', icon: Flame },
    { href: '/admin/tables', label: 'QR Tables', icon: QrCode },
    { href: '/admin/verification', label: 'Menu Audit', icon: CheckSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 p-5 shrink-0">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
          <div className="w-10 h-10 bg-amber-400 rounded-full p-0.5 flex items-center justify-center border-2 border-amber-300 shrink-0">
            <Image
              src="/images/branding/icon-192.png"
              alt="Mascot"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-xs uppercase font-black text-amber-400 block leading-none">
              Control Panel
            </span>
            <span className="text-sm font-black text-white">Student Shawarma</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Links & Logout */}
        <div className="pt-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
          >
            <span>Live Customer Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/40 rounded-xl font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header on Mobile & Tablet */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 px-4 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-full p-0.5 flex items-center justify-center">
              <Image
                src="/images/branding/icon-192.png"
                alt="Mascot"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <span className="font-black text-sm text-white">Owner Portal</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-lg"
            >
              Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 text-zinc-400 hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Bottom Navigation Bar (Optimized for One-Hand Mobile Use) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 flex items-center justify-around py-2 px-1">
        {navLinks.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Link
          href="/admin/settings"
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
            pathname === '/admin/settings' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
