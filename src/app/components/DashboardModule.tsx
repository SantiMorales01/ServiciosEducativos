import { Card, CardHeader } from './Card';
import {
  Clock,
  Calendar,
  Bus,
  UtensilsCrossed,
  Sparkles,
  FileText,
  Newspaper,
  MessageCircle,
} from 'lucide-react';
import { ModuleType } from './Sidebar';

interface DashboardModuleProps {
  onModuleChange: (module: ModuleType) => void;
}

export function DashboardModule({ onModuleChange }: DashboardModuleProps) {
  const modules = [
    {
      id: 'horarios' as ModuleType,
      title: 'Horarios',
      subtitle: 'Consulta tus horarios',
      icon: <Clock size={24} />,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'citas' as ModuleType,
      title: 'Citas con Docentes',
      subtitle: 'Agenda reuniones',
      icon: <Calendar size={24} />,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'transporte' as ModuleType,
      title: 'Transporte Escolar',
      subtitle: 'Info de rutas',
      icon: <Bus size={24} />,
      color: 'bg-success/10 text-success',
    },
    {
      id: 'comedor' as ModuleType,
      title: 'Comedor Escolar',
      subtitle: 'Menú y reservas',
      icon: <UtensilsCrossed size={24} />,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'extracurriculares' as ModuleType,
      title: 'Extracurriculares',
      subtitle: 'Actividades disponibles',
      icon: <Sparkles size={24} />,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'certificados' as ModuleType,
      title: 'Certificados',
      subtitle: 'Solicita documentos',
      icon: <FileText size={24} />,
      color: 'bg-success/10 text-success',
    },
    {
      id: 'noticias' as ModuleType,
      title: 'Noticias',
      subtitle: 'Comunicados',
      icon: <Newspaper size={24} />,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'chat' as ModuleType,
      title: 'Asistente Virtual',
      subtitle: 'Ayuda inmediata',
      icon: <MessageCircle size={24} />,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Bienvenido</h1>
        <p className="text-muted-foreground">¿Qué deseas consultar hoy?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            hover
            className="cursor-pointer"
            onClick={() => onModuleChange(module.id)}
          >
            <div className={`w-14 h-14 rounded-xl ${module.color} flex items-center justify-center mb-4`}>
              {module.icon}
            </div>
            <h3 className="text-lg text-card-foreground mb-1">{module.title}</h3>
            <p className="text-sm text-muted-foreground">{module.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
