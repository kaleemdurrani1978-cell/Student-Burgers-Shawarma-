'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-28 h-28 bg-[#fff500] rounded-2xl mx-auto p-1 flex items-center justify-center border border-amber-300 shadow-md">
            <Image
              src="/images/branding/icon-192.png"
              alt="Student Pizza & Fastfood logo"
              width={112}
              height={112}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Owner &amp; Staff Login</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Student Pizza &amp; Fastfood • Mobile Admin Control
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              Admin Password / Secret Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1.5">
              Admin credentials are configured privately for this installation.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected Route • HTTPS Encrypted</span>
          </p>
        </div>
      </div>
    </div>
  );
}
