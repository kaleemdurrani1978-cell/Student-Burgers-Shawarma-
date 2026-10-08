'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, UtensilsCrossed, QrCode, Phone, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  businessPhone?: string;
  whatsappNumber?: string;
}

export default function Navbar({
  businessPhone = '0309-4222283',
  whatsappNumber = '923094222283',
}: NavbarProps) {
  const { totalCount, subtotal, setIsCartOpen, activeTable, setActiveTable } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-amber-500 text-zinc-950 px-4 py-1.5 text-xs font-semibold tracking-wide flex items-center justify-between z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-zinc-950 text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
              Notice
            </span>
            <span>Dine-in, Takeaway &amp; Delivery across Lahore</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-zinc-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: {businessPhone}</span>
            </a>
            <span className="text-zinc-800">|</span>
            <Link href="/admin/login" className="hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" aria-label="Student Pizza & Fastfood home" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#fff500] rounded-xl border border-amber-300 p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/branding/icon-192.png"
                alt="Student Pizza & Fastfood logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="hidden lg:inline text-sm lg:text-xl font-black italic tracking-tight text-red-600 drop-shadow whitespace-nowrap">
                  STUDENT PIZZA
                </span>
                <span className="hidden lg:inline text-sm lg:text-xl font-black italic tracking-tight text-amber-400 drop-shadow whitespace-nowrap">
                  &amp; FASTFOOD
                </span>
                <span className="flex lg:hidden flex-col text-[10px] leading-tight font-black italic tracking-tight">
                  <span className="text-red-600">STUDENT PIZZA</span>
                  <span className="text-amber-400">&amp; FASTFOOD</span>
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Fast Food</span>
                <span>•</span>
                <span>61 Shalimar Link Road, Ramgarh, Lahore</span>
              </div>
            </div>
          </Link>

          {/* Table Indicator Pill (If scanning Dine-In QR) */}
          {activeTable && (
            <div className="hidden lg:flex items-center gap-2 bg-amber-950/80 border border-amber-500/50 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Dine-in: {activeTable}</span>
              <button
                onClick={() => setActiveTable(null)}
                className="ml-1 text-zinc-400 hover:text-white text-xs underline"
                title="Clear Table"
              >
                Clear
              </button>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-200">
            <Link
              href="/menu"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>Full Menu</span>
            </Link>
            <Link
              href="/menu?category=deals"
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs"
            >
              🔥 <span>Student Deals</span>
            </Link>
            <Link href="/qr" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-zinc-400" />
              <span>Table QR</span>
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About &amp; Location
            </Link>
          </nav>

          {/* Action Area: Cart & Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 px-3 sm:px-4 py-2.5 rounded-xl font-bold text-sm text-zinc-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-zinc-900 font-extrabold uppercase">My Cart</span>
                <span className="text-xs font-black">Rs. {subtotal}</span>
              </div>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-md">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-5 flex flex-col gap-4 text-sm font-semibold">
            {activeTable && (
              <div className="flex items-center justify-between bg-amber-950/60 border border-amber-500/30 px-3 py-2 rounded-lg text-amber-300 text-xs">
                <span className="font-bold">🍽️ Dine-in: {activeTable}</span>
                <button
                  onClick={() => setActiveTable(null)}
                  className="text-zinc-400 hover:text-white underline"
                >
                  Clear Table
                </button>
              </div>
            )}
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-zinc-800 text-zinc-100 flex items-center justify-between"
            >
              <span>Explore Full Menu</span>
              <span className="text-xs text-amber-400 font-normal">31 Items</span>
            </Link>
            <Link
              href="/menu?category=deals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center justify-between"
            >
              <span>🔥 Student Deals (Deals 1 to 14)</span>
              <span className="text-xs bg-amber-500 text-zinc-950 px-1.5 py-0.5 rounded font-black">
                14 Deals
              </span>
            </Link>
            <Link
              href="/qr"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-zinc-800 text-zinc-200"
            >
              Scan / Enter Table QR
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-zinc-800 text-zinc-200"
            >
              Restaurant Location &amp; Contact
            </Link>
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-amber-400 font-bold hover:underline"
              >
                Owner &amp; Staff Login
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white"
              >
                WhatsApp: {businessPhone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
