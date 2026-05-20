import { Menu, GraduationCap } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 lg:hidden bg-background border-b-2 border-border">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl hover:bg-accent text-foreground transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
          <span className="text-lg text-foreground">EduService</span>
        </div>

        <div className="w-10" />
      </div>
    </header>
  );
}
