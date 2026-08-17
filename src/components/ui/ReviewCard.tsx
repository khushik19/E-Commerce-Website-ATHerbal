// src/components/ui/ReviewCard.tsx
import Image from 'next/image';
import type { Review } from '../../types';

interface ReviewCardProps extends Review {
  id: string;
  isAdmin?: boolean;
  onApprove?: (id: string) => void;
  onDelete?:  (id: string) => void;
}

export function ReviewCard({
  id, userName, rating, reviewText,
  beforeImageUrl, afterImageUrl, status,
  isAdmin, onApprove, onDelete,
}: ReviewCardProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.25)' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[#F5E6C8] font-bold text-sm">{userName}</div>
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? 'text-[#FFD700]' : 'text-gray-600'}>★</span>
            ))}
          </div>
        </div>
        {isAdmin && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              status === 'approved' ? 'bg-green-900 text-green-300' :
              status === 'rejected' ? 'bg-red-900 text-red-300' :
              'bg-yellow-900 text-yellow-300'
            }`}
          >
            {status}
          </span>
        )}
      </div>

      <p className="text-[#F5E6C8]/80 text-sm leading-relaxed">{reviewText}</p>

      {(beforeImageUrl || afterImageUrl) && (
        <div className="flex gap-3 mt-3">
          {beforeImageUrl && (
            <div className="flex-1">
              <div className="text-[#F5E6C8]/50 text-xs mb-1">Before</div>
              <Image src={beforeImageUrl} alt="Before" width={120} height={120}
                className="w-full rounded-xl object-cover" />
            </div>
          )}
          {afterImageUrl && (
            <div className="flex-1">
              <div className="text-[#F5E6C8]/50 text-xs mb-1">After</div>
              <Image src={afterImageUrl} alt="After" width={120} height={120}
                className="w-full rounded-xl object-cover" />
            </div>
          )}
        </div>
      )}

      {isAdmin && status === 'pending' && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onApprove?.(id)}
            className="flex-1 text-xs py-1.5 rounded-lg font-bold text-[#1A0F00]"
            style={{ background: 'linear-gradient(135deg, #D4A017, #FFD700)' }}
          >
            ✓ Approve
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="flex-1 bg-red-800 text-white text-xs py-1.5 rounded-lg font-bold"
          >
            ✗ Delete
          </button>
        </div>
      )}

      {isAdmin && status !== 'pending' && (
        <button
          onClick={() => onDelete?.(id)}
          className="mt-2 text-red-400 text-xs underline"
        >
          Delete
        </button>
      )}
    </div>
  );
}
