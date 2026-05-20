import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { GraduationCap, ArrowLeft } from 'lucide-react';

interface RegisterPageProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [step, setStep] = useState(1);

  // Datos del estudiante
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [grado, setGrado] = useState('');
  const [documento, setDocumento] = useState('');

  // Datos del padre/madre
  const [nombrePadre, setNombrePadre] = useState('');
  const [apellidoPadre, setApellidoPadre] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');

  // Credenciales
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const grados = [
    'Preescolar',
    '1° Primaria',
    '2° Primaria',
    '3° Primaria',
    '4° Primaria',
    '5° Primaria',
    '6° Bachillerato',
    '7° Bachillerato',
    '8° Bachillerato',
    '9° Bachillerato',
    '10° Bachillerato',
    '11° Bachillerato',
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onRegister();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary text-white mb-4">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl text-foreground mb-2">Registro en EduService</h1>
          <p className="text-muted-foreground">Completa el formulario para crear tu cuenta</p>
        </div>

        <div className="bg-card rounded-3xl border-2 border-border p-8 shadow-lg">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= num
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      step > num ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleNextStep} className="space-y-5">
            {/* Paso 1: Datos del Estudiante */}
            {step === 1 && (
              <>
                <h2 className="text-xl text-center mb-6">Datos del Estudiante</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre del Estudiante"
                    type="text"
                    placeholder="Nombre"
                    value={nombreEstudiante}
                    onChange={(e) => setNombreEstudiante(e.target.value)}
                    required
                  />

                  <Input
                    label="Apellidos"
                    type="text"
                    placeholder="Apellidos"
                    value={apellidoEstudiante}
                    onChange={(e) => setApellidoEstudiante(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Documento de Identidad"
                  type="text"
                  placeholder="Número de documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  required
                />

                <Input
                  label="Fecha de Nacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm text-foreground mb-2">Grado</label>
                  <select
                    value={grado}
                    onChange={(e) => setGrado(e.target.value)}
                    className="w-full h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Seleccionar grado</option>
                    {grados.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Paso 2: Datos del Padre/Madre/Acudiente */}
            {step === 2 && (
              <>
                <h2 className="text-xl text-center mb-6">Datos del Acudiente</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre del Acudiente"
                    type="text"
                    placeholder="Nombre"
                    value={nombrePadre}
                    onChange={(e) => setNombrePadre(e.target.value)}
                    required
                  />

                  <Input
                    label="Apellidos"
                    type="text"
                    placeholder="Apellidos"
                    value={apellidoPadre}
                    onChange={(e) => setApellidoPadre(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Parentesco</label>
                  <select
                    value={parentesco}
                    onChange={(e) => setParentesco(e.target.value)}
                    className="w-full h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Seleccionar parentesco</option>
                    <option value="padre">Padre</option>
                    <option value="madre">Madre</option>
                    <option value="abuelo">Abuelo/a</option>
                    <option value="tio">Tío/a</option>
                    <option value="tutor">Tutor Legal</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="3001234567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />

                  <Input
                    label="Correo Electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Dirección de Residencia"
                  type="text"
                  placeholder="Calle, número, barrio"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </>
            )}

            {/* Paso 3: Crear Contraseña */}
            {step === 3 && (
              <>
                <h2 className="text-xl text-center mb-6">Crear Contraseña</h2>

                <div className="bg-accent/50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm text-foreground mb-2">Resumen de Registro</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Estudiante:</strong> {nombreEstudiante} {apellidoEstudiante}</p>
                    <p><strong>Grado:</strong> {grado}</p>
                    <p><strong>Acudiente:</strong> {nombrePadre} {apellidoPadre}</p>
                    <p><strong>Email:</strong> {email}</p>
                  </div>
                </div>

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Input
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    confirmPassword && password !== confirmPassword
                      ? 'Las contraseñas no coinciden'
                      : undefined
                  }
                  required
                />

                <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground">
                  <p className="mb-1">La contraseña debe contener:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Mínimo 8 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos un número</li>
                  </ul>
                </div>
              </>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex items-center"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Anterior
                </Button>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={step === 3 && password !== confirmPassword}
              >
                {step === 3 ? 'Crear Cuenta' : 'Siguiente'}
              </Button>
            </div>
          </form>

          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm text-primary hover:underline w-full text-center mt-6"
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 EduService - Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
