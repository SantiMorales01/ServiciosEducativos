import { useState } from 'react';
import { Card, CardHeader } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { UtensilsCrossed, Check } from 'lucide-react';

interface ComedorModuleProps {
  onBack: () => void;
}

export function ComedorModule({ onBack }: ComedorModuleProps) {
  const [reservas, setReservas] = useState<Record<string, boolean>>({});

  const menuSemanal = [
    {
      dia: 'Lunes',
      fecha: '2026-05-05',
      entrada: 'Sopa de verduras',
      principal: 'Pollo al horno con arroz',
      postre: 'Fruta fresca',
      disponible: true,
    },
    {
      dia: 'Martes',
      fecha: '2026-05-06',
      entrada: 'Ensalada mixta',
      principal: 'Pasta con salsa boloñesa',
      postre: 'Gelatina',
      disponible: true,
    },
    {
      dia: 'Miércoles',
      fecha: '2026-05-07',
      entrada: 'Crema de tomate',
      principal: 'Pescado al vapor con puré',
      postre: 'Yogurt',
      disponible: true,
    },
    {
      dia: 'Jueves',
      fecha: '2026-05-08',
      entrada: 'Sopa de lentejas',
      principal: 'Carne guisada con papas',
      postre: 'Flan',
      disponible: true,
    },
    {
      dia: 'Viernes',
      fecha: '2026-05-09',
      entrada: 'Ensalada cesar',
      principal: 'Pizza vegetariana',
      postre: 'Fruta fresca',
      disponible: true,
    },
  ];

  const toggleReserva = (fecha: string) => {
    setReservas(prev => ({
      ...prev,
      [fecha]: !prev[fecha]
    }));
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Comedor Escolar</h1>
            <p className="text-muted-foreground">Menú semanal y reservas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {menuSemanal.map((menu) => {
          const isReservado = reservas[menu.fecha];
          const isHoy = menu.fecha === '2026-05-06';

          return (
            <Card key={menu.fecha} className={isHoy ? 'border-primary' : ''}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg text-foreground">{menu.dia}</h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(menu.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                {isHoy && (
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">
                    Hoy
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Entrada</p>
                  <p className="text-sm text-foreground">{menu.entrada}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Plato Principal</p>
                  <p className="text-sm text-foreground">{menu.principal}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Postre</p>
                  <p className="text-sm text-foreground">{menu.postre}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                <div className="flex items-center gap-2">
                  {menu.disponible && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-success">Disponible</span>
                    </>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={isReservado ? 'success' : 'outline'}
                  onClick={() => toggleReserva(menu.fecha)}
                >
                  {isReservado ? (
                    <>
                      <Check size={16} className="mr-1" />
                      Reservado
                    </>
                  ) : (
                    'Reservar'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
