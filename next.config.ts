import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Guarantees local webp image assets render crisply without remote domain constraints
  },
};

export default nextConfig;
