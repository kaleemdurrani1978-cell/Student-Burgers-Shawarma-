import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Utensils,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Restaurant Information • Lahore, Pakistan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white">
            ABOUT <span className="text-amber-400">STUDENT SHAWARMA</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Serving the people of Lahore delicious, high-quality fast food, authentic chicken shawarmas, crispy burgers, and pocket-friendly Student Deals.
          </p>
        </div>

        {/* Brand Banner Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 h-48 bg-amber-400 rounded-3xl p-3 border-4 border-amber-300 shadow-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/images/branding/icon-512.png"
                alt="Student Shawarma Mascot"
                fill
                sizes="192px"
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded uppercase">
                Established Lahore
              </span>
              <span className="text-sm font-urdu font-bold text-amber-400">
                سٹوڈنٹ شوارما اینڈ فاسٹ فوڈ
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Authentic Fast-Food Heritage
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Student Shawarma (also known as Student Pizza &amp; Fastfood) is an independent local Pakistani fast-food brand situated on Shalimar Link Road in Lahore. Built on a reputation for hearty portions, student-friendly deals, and secret garlic mayo dressings, our menu is loved by students, families, and fast food enthusiasts across the area.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-zinc-300 font-semibold">
                ✓ 28 Menu Items
              </span>
              <span className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-zinc-300 font-semibold">
                ✓ 12 Student Deals
              </span>
              <span className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-zinc-300 font-semibold">
                ✓ Dine-In, Takeaway &amp; Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Verified Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact & Map */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Location &amp; Address</h3>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <p>
                <strong className="text-white block mb-0.5">Physical Address:</strong>
                Shalimar Link Road, Ramgarh, Lahore, Punjab, Pakistan
              </p>
              <p>
                <strong className="text-white block mb-0.5">Service Radius:</strong>
                Dine-in table service at location, walk-in takeaway, and localized delivery throughout Shalimar Link Road and nearby Lahore sectors.
              </p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Shalimar+Link+Road+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-4 py-2.5 rounded-xl font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Timings & Contact */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Hours &amp; Contact</h3>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <div>
                <strong className="text-white block mb-0.5">Opening Hours:</strong>
                <p>Monday – Saturday: 1:00 PM – 1:00 AM</p>
                <p className="text-red-400 font-bold mt-1">
                  Sunday: Closed (SUNDAY OFF per printed menu)
                </p>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Direct Orders &amp; WhatsApp:</strong>
                <p className="text-emerald-400 font-bold">0309-4222283 (+92 309 4222283)</p>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/923094222283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Message on WhatsApp</span>
                </a>
                <a
                  href="https://www.facebook.com/p/Student-pizza-Fastfood-100089295146903/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-950/60 border border-blue-800 text-blue-300 px-4 py-2.5 rounded-xl font-bold hover:bg-blue-900/60 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Verification Guarantee */}
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-3xl p-6 text-xs text-zinc-300 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Printed Menu Authenticity Guarantee</span>
          </div>
          <p className="leading-relaxed">
            Every product name, Urdu label, deal bundle composition, and PKR price published on this application is directly extracted from Student Shawarma&apos;s authoritative printed menus (Sides 1 &amp; 2). All orders are validated server-side to guarantee that customer pricing matches the current restaurant menu.
          </p>
        </div>
      </div>
    </div>
  );
}
