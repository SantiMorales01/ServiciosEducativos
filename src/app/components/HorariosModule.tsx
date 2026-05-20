import { Card } from './Card';
import { BackButton } from './BackButton';
import { Clock } from 'lucide-react';

interface HorariosModuleProps {
  onBack: () => void;
}

export function HorariosModule({ onBack }: HorariosModuleProps) {
  const horario = [
    { hora: '07:00 - 07:50', lunes: 'Matemáticas', martes: 'Inglés', miercoles: 'Ciencias', jueves: 'Historia', viernes: 'Arte' },
    { hora: '08:00 - 08:50', lunes: 'Inglés', martes: 'Matemáticas', miercoles: 'Educación Física', jueves: 'Ciencias', viernes: 'Música' },
    { hora: '09:00 - 09:50', lunes: 'Ciencias', martes: 'Historia', miercoles: 'Matemáticas', jueves: 'Inglés', viernes: 'Tecnología' },
    { hora: '10:00 - 10:30', lunes: 'Receso', martes: 'Receso', miercoles: 'Receso', jueves: 'Receso', viernes: 'Receso' },
    { hora: '10:30 - 11:20', lunes: 'Historia', martes: 'Arte', miercoles: 'Inglés', jueves: 'Matemáticas', viernes: 'Ciencias' },
    { hora: '11:30 - 12:20', lunes: 'Educación Física', martes: 'Ciencias', miercoles: 'Historia', jueves: 'Arte', viernes: 'Matemáticas' },
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Horarios</h1>
            <p className="text-muted-foreground">Horario semanal - Grado 5°B</p>
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left p-4 text-sm text-muted-foreground">Hora</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Lunes</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Martes</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Miércoles</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Jueves</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Viernes</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{row.hora}</td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-2 rounded-lg ${
                      row.lunes === 'Receso' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      {row.lunes}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-2 rounded-lg ${
                      row.martes === 'Receso' ? 'bg-muted text-muted-foreground' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {row.martes}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-2 rounded-lg ${
                      row.miercoles === 'Receso' ? 'bg-muted text-muted-foreground' : 'bg-success/10 text-success'
                    }`}>
                      {row.miercoles}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-2 rounded-lg ${
                      row.jueves === 'Receso' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      {row.jueves}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-2 rounded-lg ${
                      row.viernes === 'Receso' ? 'bg-muted text-muted-foreground' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {row.viernes}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
