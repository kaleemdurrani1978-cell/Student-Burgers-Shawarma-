'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Flame, Users, Check, RefreshCw } from 'lucide-react';
import { Deal } from '@/types';

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/admin/deals');
      const data = await res.json();
      if (data.deals) setDeals(data.deals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleToggleAvailability = async (deal: Deal) => {
    const updated = { ...deal, isAvailable: !deal.isAvailable };
    try {
      const res = await fetch('/api/admin/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setDeals((prev) => prev.map((d) => (d.id === deal.id ? updated : d)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeal) return;

    try {
      const res = await fetch('/api/admin/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDeal),
      });
      const data = await res.json();
      if (data.success && data.deal) {
        if (isNew) {
          setDeals((prev) => [...prev, data.deal]);
        } else {
          setDeals((prev) => prev.map((d) => (d.id === data.deal.id ? data.deal : d)));
        }
        setEditingDeal(null);
        setIsNew(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Student Deals Management</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage bundle components, prices in PKR, and availability of Deals 3 through 14.
          </p>
        </div>

        <button
          onClick={fetchDeals}
          className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-2 rounded-xl text-xs font-bold hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Deals Grid */}
      {loading ? (
        <div className="py-20 text-center text-zinc-500 text-xs">Loading deals...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-zinc-800">
                  <Image src={deal.image} alt={deal.nameEn} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-amber-500 text-zinc-950 px-2.5 py-0.5 rounded-full text-xs font-black">
                    Deal {deal.dealNumber}
                  </div>
                  {deal.isFamilyDeal && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                      Family Deal
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-amber-400 px-3 py-1 rounded-xl text-amber-400 font-black text-sm">
                    Rs. {deal.price}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-white text-base">{deal.nameEn}</h3>
                    <span className="text-amber-400 font-urdu text-xs">{deal.nameUr}</span>
                  </div>

                  {/* Components */}
                  <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80 space-y-1.5 text-xs text-zinc-300">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase block">
                      Bundle Items:
                    </span>
                    {deal.components.map((c, i) => (
                      <div key={i} className="flex justify-between text-[11px]">
                        <span>• {c.nameEn}</span>
                        <span className="text-zinc-500 font-urdu">{c.nameUr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-3 pt-3">
                <button
                  onClick={() => handleToggleAvailability(deal)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    deal.isAvailable
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}
                >
                  {deal.isAvailable ? 'Active & Available' : 'Temporarily Off'}
                </button>

                <button
                  onClick={() => setEditingDeal(deal)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Deal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Deal Modal */}
      {editingDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-black text-white">Edit {editingDeal.nameEn}</h3>
              <button onClick={() => setEditingDeal(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDeal} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 font-bold block mb-1">Deal Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingDeal.nameEn}
                  onChange={(e) => setEditingDeal({ ...editingDeal, nameEn: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">Deal Title (Urdu)</label>
                <input
                  type="text"
                  required
                  value={editingDeal.nameUr}
                  onChange={(e) => setEditingDeal({ ...editingDeal, nameUr: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-urdu"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">Price (PKR)</label>
                <input
                  type="number"
                  required
                  value={editingDeal.price}
                  onChange={(e) =>
                    setEditingDeal({ ...editingDeal, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingDeal.image}
                  onChange={(e) => setEditingDeal({ ...editingDeal, image: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">Description / Composition</label>
                <textarea
                  rows={2}
                  value={editingDeal.descriptionEn}
                  onChange={(e) =>
                    setEditingDeal({ ...editingDeal, descriptionEn: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingDeal(null)}
                  className="flex-1 bg-zinc-900 text-zinc-300 py-2.5 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-2.5 rounded-xl"
                >
                  Save Deal Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
