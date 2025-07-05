'use client';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <div
        className={`text-main t1 cursor-pointer font-extrabold tracking-[-0.1em] ${className}`}
      >
        <span className="text-white">FU</span>N
        <span className="text-white">FU</span>N
      </div>
    </Link>
  );
}
