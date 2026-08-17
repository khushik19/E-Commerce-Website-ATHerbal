'use client';
// src/components/ui/CallButton.tsx

const PHONE_NUMBER   = '8889444157';
const DISPLAY_NUMBER = '+91 88894 44157';

export function CallButton() {
  const handleCall = () => {
    window.location.href = `tel:+91${PHONE_NUMBER}`;
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 group">
      {/* Tooltip */}
      <div className="
        absolute bottom-full right-0 mb-2 px-3 py-1.5
        bg-[#1A0F00]/95 text-[#F5E6C8] text-xs font-mono rounded-lg
        whitespace-nowrap opacity-0 group-hover:opacity-100
        pointer-events-none transition-opacity duration-200
        border border-[#D4A017]/50
      ">
        {DISPLAY_NUMBER}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A0F00]/95" />
      </div>

      {/* Button */}
      <button
        onClick={handleCall}
        aria-label={`Call us at ${DISPLAY_NUMBER}`}
        className="
          relative flex items-center justify-center
          rounded-full shadow-[0_2px_16px_rgba(212,160,23,0.4)]
          active:scale-95 transition-all duration-200
        "
        style={{
          width: 52,
          height: 52,
          background: 'linear-gradient(135deg, #8B6914, #D4A017)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1A0F00">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
        </svg>
      </button>
    </div>
  );
}
