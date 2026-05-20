import { Card } from './Card';
import { BackButton } from './BackButton';
import { Newspaper, Calendar, Tag } from 'lucide-react';

interface NoticiasModuleProps {
  onBack: () => void;
}

export function NoticiasModule({ onBack }: NoticiasModuleProps) {
  const noticias = [
    {
      id: 1,
      titulo: 'Celebración del Día del Estudiante',
      categoria: 'Eventos',
      fecha: '2026-05-15',
      contenido: 'Este viernes 15 de mayo celebraremos el Día del Estudiante con actividades recreativas, concursos y rifas. La jornada iniciará a las 9:00 AM en el patio principal.',
      destacado: true,
    },
    {
      id: 2,
      titulo: 'Resultados del Concurso de Matemáticas',
      categoria: 'Académico',
      fecha: '2026-05-10',
      contenido: 'Felicitamos a los estudiantes ganadores del concurso interescolar de matemáticas. Representaron excelentemente a nuestra institución.',
      destacado: false,
    },
    {
      id: 3,
      titulo: 'Inicio de Inscripciones para Actividades Extracurriculares',
      categoria: 'Inscripciones',
      fecha: '2026-05-08',
      contenido: 'A partir del lunes 12 de mayo estarán abiertas las inscripciones para las actividades extracurriculares del segundo semestre.',
      destacado: true,
    },
    {
      id: 4,
      titulo: 'Mantenimiento Programado del Sistema',
      categoria: 'Comunicado',
      fecha: '2026-05-05',
      contenido: 'El sistema EduService estará en mantenimiento el sábado 10 de mayo de 8:00 AM a 12:00 PM. Durante este tiempo no estará disponible.',
      destacado: false,
    },
    {
      id: 5,
      titulo: 'Nueva Ruta de Transporte Escolar',
      categoria: 'Transporte',
      fecha: '2026-05-03',
      contenido: 'Informamos la apertura de una nueva ruta de transporte escolar para la zona sur de la ciudad. Consulta los horarios en el módulo de transporte.',
      destacado: false,
    },
    {
      id: 6,
      titulo: 'Convocatoria para Feria de Ciencias',
      categoria: 'Eventos',
      fecha: '2026-05-01',
      contenido: 'Se invita a todos los estudiantes a participar en la Feria de Ciencias 2026. Fecha límite de inscripción: 20 de mayo.',
      destacado: true,
    },
  ];

  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Eventos': 'bg-secondary/10 text-secondary',
      'Académico': 'bg-primary/10 text-primary',
      'Inscripciones': 'bg-success/10 text-success',
      'Comunicado': 'bg-muted text-muted-foreground',
      'Transporte': 'bg-chart-1/10 text-chart-1',
    };
    return colores[categoria] || 'bg-muted text-muted-foreground';
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Newspaper size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Noticias y Comunicados</h1>
            <p className="text-muted-foreground">Mantente informado sobre eventos y novedades</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {noticias.map((noticia) => (
          <Card
            key={noticia.id}
            hover
            className={`cursor-pointer ${noticia.destacado ? 'border-primary' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-xs ${getCategoriaColor(noticia.categoria)}`}>
                    <Tag size={12} className="inline mr-1" />
                    {noticia.categoria}
                  </span>
                  {noticia.destacado && (
                    <span className="px-3 py-1 rounded-lg bg-primary text-white text-xs">
                      Destacado
                    </span>
                  )}
                </div>
                <h3 className="text-lg text-foreground mb-2">{noticia.titulo}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{noticia.contenido}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
