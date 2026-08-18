// src/app/reviews/page.tsx
import type { Metadata } from 'next';
import { ReviewsSection } from '../../components/sections/ReviewsSection';

export const metadata: Metadata = {
  title: 'Customer Reviews | African King Herbal Power Powder',
  description: 'Read real customer reviews and success stories of African King Herbal Power Powder.',
};

export default function ReviewsPage() {
  return (
    <div className="pt-4">
      <ReviewsSection />
    </div>
  );
}
