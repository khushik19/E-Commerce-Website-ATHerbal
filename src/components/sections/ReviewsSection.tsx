'use client';
// src/components/sections/ReviewsSection.tsx
import { useEffect, useState } from 'react';
import { getApprovedReviews } from '../../lib/firestore';
import { ReviewCard } from '../ui/ReviewCard';
import { ReviewForm } from '../ReviewForm';
import { useAuth } from '../../hooks/useAuth';
import type { Review } from '../../types';

const INITIAL_REVIEWS: (Review & { id: string })[] = [
  {
    id: 'init-1',
    userId: 'seed-1',
    userName: 'Rohit S. (Delhi)',
    rating: 5,
    reviewText: 'Quality aur packaging bahut achhi laga. Product natural hai aur energy level better laga.',
    status: 'approved',
  },
  {
    id: 'init-2',
    userId: 'seed-2',
    userName: 'Amit K. (Indore)',
    rating: 5,
    reviewText: 'Delivery fast thi aur overall experience bahut achha raha. Regular use se confidence improve hua.',
    status: 'approved',
  },
  {
    id: 'init-3',
    userId: 'seed-3',
    userName: 'Vikas P. (Bhopal)',
    rating: 5,
    reviewText: 'Herbal ingredients aur premium quality pasand aayi. Body mein freshness feel hoti hai.',
    status: 'approved',
  },
  {
    id: 'init-4',
    userId: 'seed-4',
    userName: 'Sandeep R. (Jaipur)',
    rating: 5,
    reviewText: 'Natural product hai, use karne mein comfortable laga. Stamina aur energy mein difference feel hua.',
    status: 'approved',
  },
  {
    id: 'init-5',
    userId: 'seed-5',
    userName: 'Rahul M. (Pune)',
    rating: 5,
    reviewText: 'Daily routine ke saath use kar raha hoon. Overall vitality aur performance better feel ho rahi hai.',
    status: 'approved',
  },
  {
    id: 'init-6',
    userId: 'seed-6',
    userName: 'Ankit T. (Lucknow)',
    rating: 5,
    reviewText: 'Packaging bahut premium hai aur taste bhi theek hai. Worth trying product.',
    status: 'approved',
  },
];

export function ReviewsSection() {
  const { user } = useAuth();
  const [reviews, setReviews]   = useState<(Review & { id: string })[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await getApprovedReviews();
      setReviews([...data, ...INITIAL_REVIEWS] as (Review & { id: string })[]);
    } catch {
      setReviews(INITIAL_REVIEWS);
    }
    setLoading(false);
  };

  useEffect(() => { loadReviews(); }, []);

  return (
    <div className="king-bg py-10 px-4 border-t border-[#D4A017]/20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="inline-block text-[#F5E6C8]/80 text-xs px-4 py-1.5 rounded-full mb-3"
            style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            REAL PEOPLE. REAL RESULTS.
          </div>
          <h2 className="text-[#FFD700] text-2xl font-bold drop-shadow-lg" style={{ fontFamily: 'Cinzel, serif' }}>
            Customer Reviews
          </h2>
          <p className="text-[#F5E6C8]/60 italic mt-1 text-sm">Real Stories. Real Transformations.</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="h-px w-12 bg-[#D4A017]/40" />
            <div className="w-2 h-2 rounded-full bg-[#D4A017]/40" />
            <div className="h-px w-12 bg-[#D4A017]/40" />
          </div>
        </div>

        {/* Add review button */}
        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-gold w-full py-3 text-sm mb-5"
          >
            + Share Your Transformation Story
          </button>
        )}

        {!user && (
          <div
            className="rounded-xl p-3 text-center text-[#F5E6C8]/60 text-sm mb-5"
            style={{ background: 'rgba(45,26,0,0.5)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            Please register/login to share your review
          </div>
        )}

        {showForm && (
          <div className="mb-5">
            <ReviewForm onSubmitted={() => { setShowForm(false); loadReviews(); }} />
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div className="text-center text-[#F5E6C8] py-8">Loading reviews...</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
