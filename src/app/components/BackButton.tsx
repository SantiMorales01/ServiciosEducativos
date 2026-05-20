import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = 'Volver' }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="mb-6 -ml-2"
    >
      <ArrowLeft size={18} className="mr-2" />
      {label}
    </Button>
  );
}
