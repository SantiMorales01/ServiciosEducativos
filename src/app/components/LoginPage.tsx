import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { GraduationCap } from 'lucide-react';

interface LoginPageProps {
  onLogin: (nombre: string, email: string) => void;
  onShowRegister: () => void;
}

export function LoginPage({ onLogin, onShowRegister }: LoginPageProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);

  const handleLoginClick = () => {
    console.log('🔘 Botón de login presionado');

    // Login directo sin validaciones
    const nombreFinal = nombre || 'Usuario Demo';
    const emailFinal = email || 'usuario@demo.com';

    console.log('📤 Enviando datos:', { nombre: nombreFinal, email: emailFinal });

    // Llamar inmediatamente a la función de login
    onLogin(nombreFinal, emailFinal);

    console.log('✅ Función onLogin ejecutada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary text-white mb-4">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl text-foreground mb-2">EduService</h1>
          <p className="text-muted-foreground">Plataforma de Gestión Educativa</p>
        </div>

        <div className="bg-card rounded-3xl border-2 border-border p-8 shadow-lg">
          {!showRecovery ? (
            <div className="space-y-5">
              <h2 className="text-xl text-center mb-6">Iniciar Sesión</h2>

              <div className="bg-primary/5 rounded-xl p-4 mb-4">
                <p className="text-sm text-primary text-center">
                  ✨ <strong>Demo:</strong> Ingresa tu nombre y correo, luego clic en Ingresar
                </p>
              </div>

              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleLoginClick}
              >
                Ingresar
              </Button>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">¿No tienes cuenta?</span>
                <button
                  type="button"
                  onClick={onShowRegister}
                  className="text-sm text-secondary hover:underline"
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="text-xl text-center mb-6">Recuperar Contraseña</h2>

              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="correo@ejemplo.com"
              />

              <Button type="button" variant="primary" size="lg" fullWidth>
                Enviar Código
              </Button>

              <button
                type="button"
                onClick={() => setShowRecovery(false)}
                className="text-sm text-primary hover:underline w-full text-center"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 EduService - Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
