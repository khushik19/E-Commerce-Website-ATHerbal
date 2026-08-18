// src/app/benefits/page.tsx
import type { Metadata } from 'next';
import { BenefitsSection } from '../../components/sections/BenefitsSection';

export const metadata: Metadata = {
  title: 'Benefits | African King Herbal Power Powder',
  description:
    '12 powerful benefits of African King Herbal Power Powder — boost stamina, sexual performance, energy, hormonal balance and more. Made with 15+ Ayurvedic herbs.',
};

export default function BenefitsPage() {
  return (
    <div className="pt-4">
      <BenefitsSection />
    </div>
  );
}
