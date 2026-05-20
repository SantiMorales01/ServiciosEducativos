import { Card, CardHeader } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { Sparkles, Users, Clock, Calendar } from 'lucide-react';

interface ExtracurricularesModuleProps {
  onBack: () => void;
}

export function ExtracurricularesModule({ onBack }: ExtracurricularesModuleProps) {
  const actividades = [
    {
      nombre: 'Fútbol',
      descripcion: 'Entrenamiento y práctica de fútbol',
      horario: 'Lunes y Miércoles, 3:00 PM - 5:00 PM',
      instructor: 'Prof. Carlos Mendez',
      cupos: 15,
      inscritos: 12,
      categoria: 'Deportes',
    },
    {
      nombre: 'Arte y Pintura',
      descripcion: 'Desarrollo de habilidades artísticas',
      horario: 'Martes y Jueves, 3:00 PM - 4:30 PM',
      instructor: 'Prof. Ana Martínez',
      cupos: 20,
      inscritos: 18,
      categoria: 'Artes',
    },
    {
      nombre: 'Robótica',
      descripcion: 'Construcción y programación de robots',
      horario: 'Viernes, 2:00 PM - 4:00 PM',
      instructor: 'Prof. Juan Torres',
      cupos: 12,
      inscritos: 10,
      categoria: 'Tecnología',
    },
    {
      nombre: 'Coro',
      descripcion: 'Canto coral y apreciación musical',
      horario: 'Jueves, 3:00 PM - 4:30 PM',
      instructor: 'Prof. María Silva',
      cupos: 25,
      inscritos: 20,
      categoria: 'Música',
    },
    {
      nombre: 'Teatro',
      descripcion: 'Actuación y expresión dramática',
      horario: 'Miércoles, 3:00 PM - 5:00 PM',
      instructor: 'Prof. Laura Gómez',
      cupos: 18,
      inscritos: 15,
      categoria: 'Artes',
    },
    {
      nombre: 'Ajedrez',
      descripcion: 'Estrategia y pensamiento lógico',
      horario: 'Lunes, 3:00 PM - 4:00 PM',
      instructor: 'Prof. Roberto Cruz',
      cupos: 16,
      inscritos: 14,
      categoria: 'Juegos',
    },
  ];

  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Deportes': 'bg-success/10 text-success',
      'Artes': 'bg-secondary/10 text-secondary',
      'Tecnología': 'bg-primary/10 text-primary',
      'Música': 'bg-chart-4/10 text-chart-4',
      'Juegos': 'bg-chart-5/10 text-chart-5',
    };
    return colores[categoria] || 'bg-muted text-muted-foreground';
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Actividades Extracurriculares</h1>
            <p className="text-muted-foreground">Explora y únete a nuestras actividades</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {actividades.map((actividad, index) => {
          const cuposDisponibles = actividad.cupos - actividad.inscritos;
          const porcentajeOcupacion = (actividad.inscritos / actividad.cupos) * 100;

          return (
            <Card key={index}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg text-foreground mb-1">{actividad.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{actividad.descripcion}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs ${getCategoriaColor(actividad.categoria)}`}>
                  {actividad.categoria}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-primary" />
                  <span className="text-muted-foreground">{actividad.horario}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-secondary" />
                  <span className="text-muted-foreground">{actividad.instructor}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Cupos disponibles</span>
                    <span className="text-xs text-foreground">
                      {cuposDisponibles} de {actividad.cupos}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        porcentajeOcupacion >= 90
                          ? 'bg-destructive'
                          : porcentajeOcupacion >= 70
                          ? 'bg-secondary'
                          : 'bg-success'
                      }`}
                      style={{ width: `${porcentajeOcupacion}%` }}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant={cuposDisponibles > 0 ? 'primary' : 'outline'}
                fullWidth
                disabled={cuposDisponibles === 0}
              >
                {cuposDisponibles > 0 ? 'Inscribirse' : 'Sin cupos'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
