// src/app/ingredients/page.tsx
import type { Metadata } from 'next';
import { IngredientsSection } from '../../components/sections/IngredientsSection';

export const metadata: Metadata = {
  title: 'Key Ingredients | African King Herbal Power Powder',
  description:
    '15+ Ayurvedic herbs including Ashwagandha, Safed Musli, Shatavari, Gokshura, Vidarikand, Kaunch Beej, Kapikachhu, Jaiphal, Musli Safed, Bala and more.',
};

export default function IngredientsPage() {
  return (
    <div className="pt-4">
      <IngredientsSection />
    </div>
  );
}
