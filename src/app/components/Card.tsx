import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border-2 border-border bg-card p-6 shadow-sm',
        {
          'transition-all hover:shadow-md hover:border-primary/20': hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function CardHeader({ title, subtitle, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg text-card-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
