import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { Button } from './Button';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual de EduService. Estoy aquí para ayudarte con información sobre nuestros servicios. ¿Podrías compartirme tu correo electrónico?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<'email' | 'documento' | 'institucion' | 'servicio' | 'final'>('email');
  const [userData, setUserData] = useState({
    email: '',
    documento: '',
    institucion: '',
    servicio: '',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const instituciones = [
    'Colegio Champagnat',
    'Colegio Franciscano Jiménez De Cisneros',
    'Colegio Inglés',
    'Institución Educativa Camila Molano',
  ];

  const servicios = [
    'Transporte Escolar',
    'Comedor Escolar',
    'Actividades Deportivas',
    'Talleres de Arte',
    'Asesorías Académicas',
    'Club de Robótica',
    'Información General',
  ];

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');

    // Procesar respuesta según el paso
    setTimeout(() => {
      let botResponse = '';

      switch (step) {
        case 'email':
          setUserData(prev => ({ ...prev, email: inputValue }));
          botResponse = '¡Perfecto! Ahora, ¿cuál es tu número de identificación?';
          setStep('documento');
          break;

        case 'documento':
          setUserData(prev => ({ ...prev, documento: inputValue }));
          botResponse = 'Excelente. ¿De qué institución educativa deseas obtener información?';
          setStep('institucion');
          break;

        case 'institucion':
          setUserData(prev => ({ ...prev, institucion: inputValue }));
          botResponse = '¡Gracias! ¿Sobre qué servicio te gustaría recibir información?';
          setStep('servicio');
          break;

        case 'servicio':
          setUserData(prev => ({ ...prev, servicio: inputValue }));
          botResponse = `¡Perfecto! He registrado tu consulta sobre ${inputValue} para ${userData.institucion}. Un asesor se pondrá en contacto contigo pronto al correo ${userData.email}. ¿Hay algo más en lo que pueda ayudarte?`;
          setStep('final');
          break;

        case 'final':
          botResponse = '¡Gracias por usar EduService! Si tienes más preguntas, no dudes en escribirme.';
          break;
      }

      addMessage(botResponse, 'bot');
    }, 800);

    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all ${
        isMinimized ? 'w-80' : 'w-96'
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl border-2 border-border overflow-hidden transition-all ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-sm">Asistente Virtual</h3>
              <p className="text-xs opacity-80">EduService</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[440px] bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white border-2 border-border text-foreground'
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
              ))}

              {/* Quick replies */}
              {step === 'institucion' && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center">Sugerencias:</p>
                  <div className="flex flex-wrap gap-2">
                    {instituciones.map((inst, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(inst)}
                        className="px-3 py-2 text-xs rounded-lg bg-white border-2 border-border hover:border-primary transition-colors"
                      >
                        {inst}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'servicio' && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center">Servicios disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {servicios.map((serv, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(serv)}
                        className="px-3 py-2 text-xs rounded-lg bg-white border-2 border-border hover:border-primary transition-colors"
                      >
                        {serv}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-border bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 h-11 rounded-xl border-2 border-border bg-gray-50 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
