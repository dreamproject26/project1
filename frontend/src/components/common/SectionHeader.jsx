import React from 'react';
import { cn } from '@/lib/utils';

export const SectionHeader = ({ eyebrow, title, description, align = 'left', invert = false, className }) => {
  return (
    <div className={cn(
      'max-w-3xl',
      align === 'center' && 'mx-auto text-center',
      className
    )}>
      {eyebrow && (
        <span className={cn('eyebrow-gold')}>{eyebrow}</span>
      )}
      {title && (
        <h2 className={cn(
          'font-display font-semibold text-3xl md:text-4xl lg:text-[44px] leading-tight mt-4',
          invert ? 'text-primary-foreground' : 'text-foreground'
        )}>
          {title}
        </h2>
      )}
      {description && (
        <p className={cn(
          'mt-5 text-base md:text-lg leading-relaxed',
          invert ? 'text-primary-foreground/75' : 'text-muted-foreground'
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
