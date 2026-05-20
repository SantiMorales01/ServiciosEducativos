import { useState } from 'react';
import { Card, CardHeader } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { Calendar, Check } from 'lucide-react';

interface CitasModuleProps {
  onBack: () => void;
}

export function CitasModule({ onBack }: CitasModuleProps) {
  const [selectedDocente, setSelectedDocente] = useState('');
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const docentes = [
    { id: '1', nombre: 'Prof. María García', materia: 'Matemáticas' },
    { id: '2', nombre: 'Prof. Juan Pérez', materia: 'Ciencias' },
    { id: '3', nombre: 'Prof. Ana López', materia: 'Inglés' },
    { id: '4', nombre: 'Prof. Carlos Ruiz', materia: 'Historia' },
  ];

  const horarios = ['08:00 AM', '09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const citasAgendadas = [
    { docente: 'Prof. María García', materia: 'Matemáticas', fecha: '2026-05-10', hora: '09:00 AM', estado: 'confirmada' },
  ];

  const handleAgendar = () => {
    if (selectedDocente && selectedFecha && selectedHora) {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedDocente('');
        setSelectedFecha('');
        setSelectedHora('');
      }, 3000);
    }
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Agendamiento de Citas</h1>
            <p className="text-muted-foreground">Programa reuniones con docentes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader title="Nueva Cita" subtitle="Selecciona docente, fecha y hora" />

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Docente</label>
              <select
                value={selectedDocente}
                onChange={(e) => setSelectedDocente(e.target.value)}
                className="w-full h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Seleccionar docente</option>
                {docentes.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.nombre} - {doc.materia}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">Fecha</label>
              <input
                type="date"
                value={selectedFecha}
                onChange={(e) => setSelectedFecha(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">Hora</label>
              <div className="grid grid-cols-3 gap-2">
                {horarios.map((hora) => (
                  <button
                    key={hora}
                    onClick={() => setSelectedHora(hora)}
                    className={`py-2 px-3 rounded-lg border-2 transition-all ${
                      selectedHora === hora
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleAgendar}
              disabled={!selectedDocente || !selectedFecha || !selectedHora}
            >
              Agendar Cita
            </Button>

            {showConfirmation && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-success/10 text-success">
                <Check size={20} />
                <span className="text-sm">¡Cita agendada exitosamente!</span>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Citas Agendadas" subtitle="Próximas reuniones" />

          <div className="space-y-3">
            {citasAgendadas.map((cita, index) => (
              <div key={index} className="p-4 rounded-xl bg-accent border-2 border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-foreground">{cita.docente}</p>
                    <p className="text-xs text-muted-foreground">{cita.materia}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-xs">
                    Confirmada
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{new Date(cita.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>{cita.hora}</span>
                </div>
              </div>
            ))}
            {citasAgendadas.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No tienes citas agendadas</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
