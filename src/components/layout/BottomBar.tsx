// src/components/layout/BottomBar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Package, ClipboardList, Handshake } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsappButton';
import { CODModal } from '@/components/popups/CODModal';

export function BottomBar() {
  const [showCOD, setShowCOD] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A0F00]/90 backdrop-blur-md border-t border-[#D4A017]/30">
        <div className="flex items-center justify-around w-full px-2 py-2 sm:px-6 md:px-12 lg:px-24 xl:max-w-4xl xl:mx-auto">

          {/* Cart */}
          <Link href="/cart" className="flex flex-col items-center text-[#D4A017] hover:text-[#FFD700] transition-colors gap-0.5 flex-1">
            <ShoppingCart size={22} />
            <span className="text-xs font-medium">Cart</span>
          </Link>

          {/* COD */}
          <button
            onClick={() => setShowCOD(true)}
            className="flex flex-col items-center text-[#D4A017] hover:text-[#FFD700] transition-colors gap-0.5 flex-1"
          >
            <ClipboardList size={22} />
            <span className="text-xs font-medium">COD</span>
          </button>

          {/* WhatsApp */}
          <div className="flex-1 flex justify-center">
            <WhatsAppButton />
          </div>

          {/* Orders */}
          <Link href="/orders" className="flex flex-col items-center text-[#D4A017] hover:text-[#FFD700] transition-colors gap-0.5 flex-1">
            <Package size={22} />
            <span className="text-xs font-medium">Orders</span>
          </Link>

          {/* Affiliate */}
          <Link href="/affiliate" className="flex flex-col items-center text-[#D4A017] hover:text-[#FFD700] transition-colors gap-0.5 flex-1">
            <Handshake size={22} />
            <span className="text-xs font-medium">Affiliate</span>
          </Link>

        </div>
      </div>

      {showCOD && <CODModal onClose={() => setShowCOD(false)} />}
    </>
  );
}
