import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-xl transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/90': variant === 'secondary',
            'bg-success text-success-foreground hover:bg-success/90': variant === 'success',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'border-2 border-border bg-background hover:bg-accent': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-6': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
