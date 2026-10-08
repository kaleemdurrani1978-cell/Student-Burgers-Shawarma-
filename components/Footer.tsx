import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  phone?: string;
  whatsappNumber?: string;
  address?: string;
}

export default function Footer({
  phone = '0309-4222283',
  whatsappNumber = '923094222283',
  address = 'Shalimar Link Road, Ramgarh, Lahore, Pakistan',
}: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 rounded-full border-2 border-amber-300 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/images/branding/icon-192.png"
                  alt="Student Shawarma Mascot"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-black italic text-amber-400 leading-none">
                  <span className="text-red-500">STUDENT</span> SHAWARMA
                </h3>
                <p className="text-xs text-zinc-400 font-urdu mt-0.5">سٹوڈنٹ شوارما اینڈ فاسٹ فوڈ</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Serving the most delicious, authentic shawarmas, crispy zinger burgers, stuffed platters, and budget-friendly student deals in Lahore.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded-full">
                Authentic Menu 2026
              </span>
              <span className="text-[11px] font-bold text-red-400 bg-red-950/60 border border-red-600/40 px-2 py-0.5 rounded-full">
                Sunday Off
              </span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-zinc-800 pb-2">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/menu?category=shawarma" className="hover:text-amber-400 transition-colors">
                  🍗 Chicken &amp; Zinger Shawarma
                </Link>
              </li>
              <li>
                <Link href="/menu?category=deals" className="text-amber-400 hover:underline font-semibold">
                  🔥 Student Deals (Deals 3 to 14)
                </Link>
              </li>
              <li>
                <Link href="/menu?category=burgers" className="hover:text-amber-400 transition-colors">
                  🍔 Zinger, Tikka &amp; Shami Burgers
                </Link>
              </li>
              <li>
                <Link href="/menu?category=platters-rolls" className="hover:text-amber-400 transition-colors">
                  🥙 Platters &amp; Paratha Rolls
                </Link>
              </li>
              <li>
                <Link href="/menu?category=chicken-snacks" className="hover:text-amber-400 transition-colors">
                  🍗 Crispy Wings &amp; Drumsticks
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sandwiches" className="hover:text-amber-400 transition-colors">
                  🥪 Club &amp; Tikka Sandwiches
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-zinc-800 pb-2">
              Verified Information
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline font-semibold text-zinc-300"
                >
                  WhatsApp: {phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-300">Mon – Sat: 1:00 PM – 1:00 AM</p>
                  <p className="text-red-400 font-bold">Sunday: Closed (Sunday Off)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Admin Portal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-zinc-800 pb-2">
              Restaurant Control
            </h4>
            <p className="text-xs text-zinc-400">
              Restaurant staff and owner portal for live order tracking, menu updates, and QR generation:
            </p>
            <div className="space-y-2 pt-1">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors w-full justify-center"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Owner Admin Portal</span>
              </Link>
              <a
                href="https://www.facebook.com/p/Student-pizza-Fastfood-100089295146903/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-900/60 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors w-full justify-center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Official Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Student Shawarma &amp; Fast Food. All prices in PKR (Rs.).</p>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Student Shawarma Lahore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
