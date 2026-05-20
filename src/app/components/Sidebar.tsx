import {
  Calendar,
  Clock,
  Bus,
  UtensilsCrossed,
  Sparkles,
  FileText,
  Newspaper,
  MessageCircle,
  GraduationCap,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

export type ModuleType =
  | 'dashboard'
  | 'horarios'
  | 'citas'
  | 'transporte'
  | 'comedor'
  | 'extracurriculares'
  | 'certificados'
  | 'noticias'
  | 'chat';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'horarios' as ModuleType, label: 'Horarios', icon: Clock },
  { id: 'citas' as ModuleType, label: 'Citas con Docentes', icon: Calendar },
  { id: 'transporte' as ModuleType, label: 'Transporte Escolar', icon: Bus },
  { id: 'comedor' as ModuleType, label: 'Comedor Escolar', icon: UtensilsCrossed },
  { id: 'extracurriculares' as ModuleType, label: 'Extracurriculares', icon: Sparkles },
  { id: 'certificados' as ModuleType, label: 'Certificados', icon: FileText },
  { id: 'noticias' as ModuleType, label: 'Noticias', icon: Newspaper },
  { id: 'chat' as ModuleType, label: 'Asistente Virtual', icon: MessageCircle },
];

export function Sidebar({ activeModule, onModuleChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-72 bg-sidebar border-r-2 border-sidebar-border z-50',
          'transform transition-transform duration-300 ease-in-out',
          'lg:transform-none lg:static lg:z-auto',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b-2 border-sidebar-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-lg text-sidebar-foreground">EduService</h2>
                <p className="text-xs text-muted-foreground">Portal Educativo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-muted-foreground hover:text-foreground p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onModuleChange(item.id);
                      onClose();
                    }}
                    className={clsx(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                      'text-left',
                      {
                        'bg-primary text-white': isActive,
                        'text-sidebar-foreground hover:bg-sidebar-accent': !isActive,
                      }
                    )}
                  >
                    <Icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t-2 border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="text-lg">PF</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-sidebar-foreground">Padre de Familia</p>
                <p className="text-xs text-muted-foreground">Grado 5°B</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
