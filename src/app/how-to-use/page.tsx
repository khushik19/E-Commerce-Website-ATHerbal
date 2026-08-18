// src/app/how-to-use/page.tsx
import type { Metadata } from 'next';
import { HowToUseSection } from '../../components/sections/HowToUseSection';

export const metadata: Metadata = {
  title: 'How to Use | African King Herbal Power Powder',
  description:
    'Take 1 spoon twice daily — morning and evening — after meals with warm milk. Use regularly for best results.',
};

export default function HowToUsePage() {
  return (
    <div className="pt-4">
      <HowToUseSection />
    </div>
  );
}
