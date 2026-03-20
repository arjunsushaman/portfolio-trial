'use client';

import { useEffect, useState } from 'react';

// ─── Budget data ──────────────────────────────────────────────────────────────
const BUDGET_OPTIONS: Record<string, string[]> = {
  INR: ['< ₹25k', '₹25k – ₹50k', '₹50k – ₹1L', '₹1L – ₹2L', '₹2L+'],
  GBP: ['< £250', '£250 – £500', '£500 – £1k', '£1k – £2k', '£2k+'],
  EUR: ['< €300', '€300 – €600', '€600 – €1.2k', '€1.2k – €2.4k', '€2.4k+'],
  USD: ['< $300', '$300 – $600', '$600 – $1.2k', '$1.2k – $2.4k', '$2.4k+'],
};

// ─── Country code → flag emoji ────────────────────────────────────────────────
function countryToFlag(countryCode: string): string {
  // Each letter maps to a Regional Indicator Symbol (U+1F1E6 … U+1F1FF)
  return countryCode
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join('');
}

// ─── Cookie reader ────────────────────────────────────────────────────────────
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface BudgetSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export default function BudgetSelect({ value, onChange }: BudgetSelectProps) {
  const [currency, setCurrency] = useState<string>('USD');
  const [locale, setLocale]     = useState<string>('US');

  useEffect(() => {
    const c = getCookie('user-currency') ?? 'USD';
    const l = getCookie('user-locale')   ?? 'US';
    setCurrency(c);
    setLocale(l);
  }, []);

  const options = BUDGET_OPTIONS[currency] ?? BUDGET_OPTIONS['USD'];
  const flag    = countryToFlag(locale);

  return (
    <div>
      {/* Label row */}
      <p className="font-mono text-[9px] text-white/25 tracking-[0.2em] uppercase mb-2.5 px-0.5 flex items-center gap-2">
        Project Budget
        <span
          className="text-[13px] leading-none"
          role="img"
          aria-label={`Country flag for ${locale}`}
          title={locale}
        >
          {flag}
        </span>
      </p>

      {/* Pill buttons */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(value === opt ? '' : opt)}
            className="relative font-mono text-[10px] px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              border:     `1px solid ${value === opt ? 'rgba(0,255,245,0.45)' : 'rgba(255,255,255,0.07)'}`,
              background: value === opt ? 'rgba(0,255,245,0.08)' : 'rgba(255,255,255,0.02)',
              color:      value === opt ? 'rgba(0,255,245,0.9)'  : 'rgba(255,255,255,0.3)',
              boxShadow:  value === opt ? '0 0 12px rgba(0,255,245,0.08)' : 'none',
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Helper text */}
      <p className="font-mono text-[9px] text-white/20 tracking-[0.14em] mt-2 px-0.5 italic">
        Project scope and precision are optimized based on your budget selection.
      </p>
    </div>
  );
}
