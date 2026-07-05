import React from 'react';
import { PenLine } from 'lucide-react';

export const EditableBadge = ({ label = 'Editable placeholder — admin can update' }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-medium text-accent/90 border border-accent/25 bg-accent/[0.06] px-2 py-1 rounded-sm">
    <PenLine className="h-3 w-3" /> {label}
  </span>
);
