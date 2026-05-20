import { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { BackButton } from './BackButton';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatModuleProps {
  onBack: () => void;
}

export function ChatModule({ onBack }: ChatModuleProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente virtual de EduService. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const respuestasBot: Record<string, string> = {
    'horario': 'Puedes consultar tus horarios en el módulo de Horarios. Allí encontrarás tu horario semanal completo.',
    'cita': 'Para agendar una cita con un docente, dirígete al módulo de Citas. Podrás seleccionar el docente, fecha y hora.',
    'transporte': 'Consulta la información de rutas y horarios de transporte en el módulo de Transporte Escolar.',
    'comedor': 'El menú semanal del comedor está disponible en el módulo de Comedor Escolar. También puedes hacer reservas allí.',
    'certificado': 'Para solicitar un certificado, ve al módulo de Certificados y completa el formulario de solicitud.',
    'actividades': 'Consulta todas las actividades extracurriculares disponibles en el módulo correspondiente.',
    'nota': 'Para consultar tus notas o calificaciones, puedes solicitar un certificado de notas en el módulo de Certificados.',
    'default': 'Entiendo tu consulta. Por favor, especifica más detalles o selecciona el módulo correspondiente desde el menú principal.',
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let respuesta = respuestasBot.default;

      for (const [key, value] of Object.entries(respuestasBot)) {
        if (lowerInput.includes(key)) {
          respuesta = value;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: respuesta,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const sugerencias = [
    '¿Cómo consulto mi horario?',
    '¿Cómo agendar una cita?',
    'Información del comedor',
    'Solicitar certificado',
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Asistente Virtual</h1>
            <p className="text-muted-foreground">Obtén ayuda rápida para tus consultas</p>
          </div>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-accent text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground mb-2">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {sugerencias.map((sugerencia, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(sugerencia)}
                  className="px-3 py-2 text-xs rounded-lg bg-accent hover:bg-accent/80 text-foreground border-2 border-border transition-colors"
                >
                  {sugerencia}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t-2 border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 h-11 rounded-xl border-2 border-border bg-input-background px-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
