import { Card, CardHeader } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { Bus, MapPin, Clock, CheckCircle } from 'lucide-react';

interface TransporteModuleProps {
  onBack: () => void;
}

export function TransporteModule({ onBack }: TransporteModuleProps) {
  const rutas = [
    {
      numero: 'Ruta 3',
      zona: 'Zona Norte',
      horarioIda: '06:30 AM',
      horarioRegreso: '02:00 PM',
      estado: 'activo',
      paradas: ['Parque Central', 'Av. Principal', 'Calle 45', 'Colegio'],
    },
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
            <Bus size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Transporte Escolar</h1>
            <p className="text-muted-foreground">Información de rutas y horarios</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado del Servicio</p>
              <p className="text-lg text-foreground">Activo</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Próxima Salida</p>
              <p className="text-lg text-foreground">06:30 AM</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Bus size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ruta Asignada</p>
              <p className="text-lg text-foreground">Ruta 3</p>
            </div>
          </div>
        </Card>
      </div>

      {rutas.map((ruta, index) => (
        <Card key={index} className="mb-6">
          <CardHeader
            title={ruta.numero}
            subtitle={ruta.zona}
            icon={<Bus size={24} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-primary" />
                <h4 className="text-sm text-foreground">Horarios</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-lg bg-accent">
                  <span className="text-sm text-muted-foreground">Ida (Mañana)</span>
                  <span className="text-sm text-foreground">{ruta.horarioIda}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-accent">
                  <span className="text-sm text-muted-foreground">Regreso (Tarde)</span>
                  <span className="text-sm text-foreground">{ruta.horarioRegreso}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-secondary" />
                <h4 className="text-sm text-foreground">Paradas</h4>
              </div>
              <div className="space-y-2">
                {ruta.paradas.map((parada, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-sm text-foreground">{parada}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button variant="success" fullWidth>
            Solicitar Inscripción al Transporte
          </Button>
        </Card>
      ))}
    </div>
  );
}
