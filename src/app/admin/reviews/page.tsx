// src/app/admin/reviews/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getAllReviews, approveReview, deleteReview } from '../../../lib/firestore';
import { ReviewCard } from '../../../components/ui/ReviewCard';
import { Review } from '../../../types';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<(Review & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    const data = await getAllReviews();
    setReviews(data as (Review & { id: string })[]);
    setLoading(false);
  };

  useEffect(() => { loadReviews(); }, []);

  const handleApprove = async (id: string) => {
    await approveReview(id);
    toast.success('Review approved');
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this review permanently?')) {
      await deleteReview(id);
      toast.success('Review deleted');
      loadReviews();
    }
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-8" style={{ background: '#0D0800' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/admin" className="text-[#D4A017] text-sm">← Back</Link>
          <h1 className="text-[#F5E6C8] text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            Reviews ({reviews.length})
          </h1>
        </div>

        {loading ? (
          <div className="text-[#F5E6C8] text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                isAdmin
                onApprove={handleApprove}
                onDelete={handleDelete}
              />
            ))}
            {reviews.length === 0 && (
              <div className="text-[#F5E6C8]/50 text-center py-8">No reviews yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
