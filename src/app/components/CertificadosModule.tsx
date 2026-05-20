import { useState } from 'react';
import { Card, CardHeader } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { Input } from './Input';
import { FileText, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface CertificadosModuleProps {
  onBack: () => void;
}

export function CertificadosModule({ onBack }: CertificadosModuleProps) {
  const [showForm, setShowForm] = useState(false);
  const [tipoCertificado, setTipoCertificado] = useState('');
  const [motivo, setMotivo] = useState('');

  const tiposCertificado = [
    { id: 'estudio', nombre: 'Certificado de Estudio' },
    { id: 'notas', nombre: 'Certificado de Notas' },
    { id: 'conducta', nombre: 'Certificado de Conducta' },
    { id: 'asistencia', nombre: 'Certificado de Asistencia' },
  ];

  const solicitudes = [
    {
      id: '001',
      tipo: 'Certificado de Estudio',
      fecha: '2026-05-01',
      estado: 'completado',
      fechaEstimada: '2026-05-03',
    },
    {
      id: '002',
      tipo: 'Certificado de Notas',
      fecha: '2026-05-04',
      estado: 'en_proceso',
      fechaEstimada: '2026-05-08',
    },
    {
      id: '003',
      tipo: 'Certificado de Conducta',
      fecha: '2026-05-05',
      estado: 'pendiente',
      fechaEstimada: '2026-05-10',
    },
  ];

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case 'completado':
        return {
          label: 'Completado',
          icon: <CheckCircle size={16} />,
          color: 'bg-success/10 text-success',
        };
      case 'en_proceso':
        return {
          label: 'En Proceso',
          icon: <Clock size={16} />,
          color: 'bg-secondary/10 text-secondary',
        };
      case 'pendiente':
        return {
          label: 'Pendiente',
          icon: <AlertCircle size={16} />,
          color: 'bg-muted text-muted-foreground',
        };
      default:
        return {
          label: 'Desconocido',
          icon: <AlertCircle size={16} />,
          color: 'bg-muted text-muted-foreground',
        };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setTipoCertificado('');
    setMotivo('');
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Solicitud de Certificados</h1>
            <p className="text-muted-foreground">Gestiona tus documentos académicos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card hover className="cursor-pointer" onClick={() => setShowForm(!showForm)}>
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <FileText size={32} />
            </div>
            <h3 className="text-lg text-foreground mb-1">Nueva Solicitud</h3>
            <p className="text-sm text-muted-foreground">Solicitar un certificado</p>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl text-secondary mb-2">{solicitudes.filter(s => s.estado === 'en_proceso').length}</div>
            <p className="text-sm text-muted-foreground">En Proceso</p>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl text-success mb-2">{solicitudes.filter(s => s.estado === 'completado').length}</div>
            <p className="text-sm text-muted-foreground">Completados</p>
          </div>
        </Card>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader title="Nueva Solicitud" subtitle="Completa el formulario" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Tipo de Certificado</label>
              <select
                value={tipoCertificado}
                onChange={(e) => setTipoCertificado(e.target.value)}
                className="w-full h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Seleccionar tipo</option>
                {tiposCertificado.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">Motivo de la Solicitud</label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe brevemente el motivo de tu solicitud..."
                className="w-full h-24 rounded-xl border-2 border-border bg-input-background px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="success" fullWidth>
                Enviar Solicitud
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader title="Historial de Solicitudes" subtitle="Seguimiento de tus certificados" />

        <div className="space-y-3">
          {solicitudes.map((solicitud) => {
            const estadoInfo = getEstadoInfo(solicitud.estado);

            return (
              <div
                key={solicitud.id}
                className="p-4 rounded-xl bg-accent border-2 border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm text-foreground mb-1">{solicitud.tipo}</h4>
                    <p className="text-xs text-muted-foreground">
                      Solicitud: {new Date(solicitud.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fecha estimada: {new Date(solicitud.fechaEstimada).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs ${estadoInfo.color}`}>
                      {estadoInfo.icon}
                      {estadoInfo.label}
                    </span>
                    {solicitud.estado === 'completado' && (
                      <Button size="sm" variant="outline">
                        <Download size={14} className="mr-1" />
                        Descargar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
