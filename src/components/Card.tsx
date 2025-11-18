import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      "bg-gray-800 rounded-xl shadow-lg border border-gray-700",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children }: CardProps) => (
  <div className={cn("p-4 sm:p-6 border-b border-gray-700", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <h3 className={cn("text-lg font-semibold text-gray-100", className)}>{children}</h3>
);

export const CardContent = ({ className, children }: CardProps) => (
  <div className={cn("p-4 sm:p-6", className)}>
    {children}
  </div>
);
