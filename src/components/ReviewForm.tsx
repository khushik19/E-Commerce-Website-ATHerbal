'use client';
// src/components/ReviewForm.tsx
import { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { submitReview } from '../lib/firestore';
import { uploadImage } from '../lib/uploadImage';
import toast from 'react-hot-toast';

export function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user, userProfile } = useAuth();
  const [rating, setRating]   = useState(5);
  const [text, setText]       = useState('');
  const [loading, setLoading] = useState(false);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef  = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!user) { toast.error('Please login first'); return; }
    if (!text.trim()) { toast.error('Please write your review'); return; }

    setLoading(true);
    try {
      let beforeImageUrl = '';
      let afterImageUrl  = '';

      if (beforeRef.current?.files?.[0]) {
        beforeImageUrl = await uploadImage(
          beforeRef.current.files[0],
          `reviews/${user.uid}/before_${Date.now()}`
        );
      }
      if (afterRef.current?.files?.[0]) {
        afterImageUrl = await uploadImage(
          afterRef.current.files[0],
          `reviews/${user.uid}/after_${Date.now()}`
        );
      }

      await submitReview({
        userId: user.uid,
        userName: userProfile?.name || 'Anonymous',
        rating,
        reviewText: text,
        beforeImageUrl,
        afterImageUrl,
        createdAt: new Date(),
      });

      toast.success('Review submitted! It will appear after approval. 👑');
      onSubmitted();
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
    >
      <h3 className="text-[#FFD700] font-bold text-base" style={{ fontFamily: 'Cinzel, serif' }}>
        Share Your Experience
      </h3>

      {/* Rating */}
      <div>
        <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? 'text-[#FFD700]' : 'text-gray-600'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Review text */}
      <div>
        <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Your Review *</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with African King Herbal Power Powder..."
          className="input-field"
          rows={4}
        />
      </div>

      {/* Before/After images */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Before Photo (optional)</label>
          <input ref={beforeRef} type="file" accept="image/*" className="input-field text-xs py-1" />
        </div>
        <div>
          <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">After Photo (optional)</label>
          <input ref={afterRef} type="file" accept="image/*" className="input-field text-xs py-1" />
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading} className="btn-gold w-full py-3 text-sm">
        {loading ? 'Submitting...' : 'Submit Review →'}
      </button>

      <p className="text-center text-[#F5E6C8]/40 text-xs">
        Reviews are shown publicly after admin approval.
      </p>
    </div>
  );
}
