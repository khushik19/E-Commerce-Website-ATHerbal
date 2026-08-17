// src/components/ui/MortarLoader.tsx
export function MortarLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full border-2 border-[#1A0F00] border-t-transparent animate-spin" />
      <span>Processing...</span>
    </div>
  );
}
