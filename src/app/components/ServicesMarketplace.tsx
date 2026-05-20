import { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { ChatbotWidget } from './ChatbotWidget';
import { ThemeToggle } from './ThemeToggle';
import {
  GraduationCap,
  ShoppingCart,
  ArrowLeft,
  Bus,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Users,
  Calendar,
  Clock,
  FileText,
} from 'lucide-react';

interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  frecuencia: string;
  icon: React.ReactNode;
  categoria: string;
  imagen: string;
  gratuito?: boolean;
}

interface ServicesMarketplaceProps {
  schoolId: string;
  onBack: () => void;
  onAddToCart: (service: Service) => void;
  onViewCart: () => void;
  cartItemsCount: number;
}

export function ServicesMarketplace({
  schoolId,
  onBack,
  onAddToCart,
  onViewCart,
  cartItemsCount,
}: ServicesMarketplaceProps) {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const servicios: Service[] = [
    {
      id: 'transporte-ida-vuelta',
      nombre: 'Transporte Escolar (Ida y Vuelta)',
      descripcion: 'Servicio completo de transporte con rutas establecidas y seguras',
      precio: 150000,
      frecuencia: 'Mensual',
      icon: <Bus size={24} />,
      categoria: 'Transporte',
      imagen: '/public/bus.jpg',
    },
    {
      id: 'transporte-ida',
      nombre: 'Transporte Escolar (Solo Ida)',
      descripcion: 'Servicio de transporte solo en la mañana',
      precio: 85000,
      frecuencia: 'Mensual',
      icon: <Bus size={24} />,
      categoria: 'Transporte',
      imagen: '/public/bus2.jpg',
    },
    {
      id: 'comedor-completo',
      nombre: 'Plan de Comedor Completo',
      descripcion: 'Almuerzo balanceado todos los días escolares del mes',
      precio: 180000,
      frecuencia: 'Mensual',
      icon: <UtensilsCrossed size={24} />,
      categoria: 'Alimentación',
      imagen: 'https://images.unsplash.com/photo-1656414270935-1dbf52b3bbca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2Nob29sJTIwbHVuY2glMjB0cmF5JTIwY29sb3JmdWx8ZW58MXx8fHwxNzc4MjY0Mzk4fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'comedor-dias',
      nombre: 'Plan de Comedor por Días',
      descripcion: 'Selecciona los días que necesitas el servicio de comedor',
      precio: 12000,
      frecuencia: 'Por día',
      icon: <UtensilsCrossed size={24} />,
      categoria: 'Alimentación',
      imagen: 'https://images.unsplash.com/photo-1505207957430-0378f105b2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwc2Nob29sJTIwbHVuY2glMjB0cmF5JTIwY29sb3JmdWx8ZW58MXx8fHwxNzc4MjY0Mzk4fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'futbol',
      nombre: 'Fútbol',
      descripcion: 'Clases de fútbol 2 veces por semana',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <Sparkles size={24} />,
      categoria: 'Deportes',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1766260771551-5a3aa7cbd8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZyUyMHNvY2NlciUyMGZvb3RiYWxsJTIwZmllbGR8ZW58MXx8fHwxNzc4MjY0Mzk4fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'natacion',
      nombre: 'Natación',
      descripcion: 'Clases de natación con instructor certificado',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <Sparkles size={24} />,
      categoria: 'Deportes',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1778145214610-9f3a5efd5760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN3aW1taW5nJTIwcG9vbCUyMGxlc3NvbnxlbnwxfHx8fDE3NzgyNjQzOTh8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'musica',
      nombre: 'Clases de Música',
      descripcion: 'Aprende a tocar instrumentos musicales',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <Sparkles size={24} />,
      categoria: 'Artes',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1637257526540-43d96c33fbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbXVzaWMlMjBpbnN0cnVtZW50cyUyMGNsYXNzfGVufDF8fHx8MTc3ODI2NDM5OXww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'arte',
      nombre: 'Taller de Arte y Pintura',
      descripcion: 'Desarrollo de habilidades artísticas y creatividad',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <Sparkles size={24} />,
      categoria: 'Artes',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1703301287688-c9a306ebed99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBhaW50aW5nJTIwYXJ0JTIwd29ya3Nob3B8ZW58MXx8fHwxNzc4MjY0Mzk5fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'asesoria-matematicas',
      nombre: 'Asesoría Académica - Matemáticas',
      descripcion: 'Refuerzo personalizado en matemáticas',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <BookOpen size={24} />,
      categoria: 'Académico',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1758685733985-695e588224d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwdHV0b3JpbmclMjBzdHVkZW50JTIwdGVhY2hlcnxlbnwxfHx8fDE3NzgyNjQ0MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'asesoria-ingles',
      nombre: 'Asesoría Académica - Inglés',
      descripcion: 'Clases de refuerzo en inglés con profesor nativo',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <BookOpen size={24} />,
      categoria: 'Académico',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1663866702581-a9712aed5c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwY2xhc3MlMjBsZWFybmluZyUyMGxhbmd1YWdlfGVufDF8fHx8MTc3ODI2NDQwMXww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'tareas-dirigidas',
      nombre: 'Tareas Dirigidas',
      descripcion: 'Acompañamiento en la realización de tareas escolares',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <FileText size={24} />,
      categoria: 'Académico',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1758525861793-9258e09708e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21ld29yayUyMGhlbHAlMjBzdHVkZW50JTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzc4MjY0NDAyfDA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 'robotica',
      nombre: 'Club de Robótica',
      descripcion: 'Construcción y programación de robots',
      precio: 0,
      frecuencia: 'Gratuito',
      icon: <Sparkles size={24} />,
      categoria: 'Tecnología',
      gratuito: true,
      imagen: 'https://images.unsplash.com/photo-1694532415679-13a10fb3d519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcm9ib3RpY3MlMjBidWlsZGluZyUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3ODI2NDQwMnww&ixlib=rb-4.1.0&q=80&w=400',
    },
  ];

  const categorias = [...new Set(servicios.map((s) => s.categoria))];

  const categoriaImages: Record<string, string> = {
    'Transporte': '/public/transporte.avif',
    'Alimentación': 'https://images.unsplash.com/photo-1699345461139-73dfeecab9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY29sb3JmdWwlMjBzY2hvb2wlMjBsdW5jaCUyMGZvb2QlMjBraWRzfGVufDF8fHx8MTc3ODI2MzY4OHww&ixlib=rb-4.1.0&q=80&w=800',
    'Deportes': 'https://images.unsplash.com/photo-1762345565397-ba85070a5bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBzb2NjZXIlMjBvdXRkb29yJTIwc3BvcnR8ZW58MXx8fHwxNzc4MjYzNjg5fDA&ixlib=rb-4.1.0&q=80&w=800',
    'Artes': 'https://images.unsplash.com/photo-1765947386189-975769d0f162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFpbnRpbmclMjBhcnQlMjBjcmVhdGl2ZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3ODI2MzY4OXww&ixlib=rb-4.1.0&q=80&w=800',
    'Académico': 'https://images.unsplash.com/photo-1758685733926-00cba008215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwYm9va3N8ZW58MXx8fHwxNzc4MjYzNjkwfDA&ixlib=rb-4.1.0&q=80&w=800',
    'Tecnología': 'https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcm9ib3QlMjBwcm9ncmFtbWluZyUyMHN0ZW0lMjBlZHVjYXRpb258ZW58MXx8fHwxNzc4MjYzNjkwfDA&ixlib=rb-4.1.0&q=80&w=800',
  };

  const handleAddToCart = (service: Service) => {
    onAddToCart(service);
    setAddedItems(new Set(addedItems).add(service.id));

    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(service.id);
        return newSet;
      });
    }, 2000);
  };

  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Transporte': 'bg-success/10 text-success',
      'Alimentación': 'bg-secondary/10 text-secondary',
      'Deportes': 'bg-primary/10 text-primary',
      'Artes': 'bg-chart-5/10 text-chart-5',
      'Académico': 'bg-chart-1/10 text-chart-1',
      'Tecnología': 'bg-chart-4/10 text-chart-4',
    };
    return colores[categoria] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-xl hover:bg-accent transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-lg text-foreground">Colegio Champagnat</h1>
                <p className="text-xs text-muted-foreground">Ibagué, Tolima - Servicios Disponibles</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={onViewCart}
                className="relative p-3 rounded-xl hover:bg-accent transition-colors"
              >
                <ShoppingCart size={24} className="text-foreground" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl text-foreground mb-2">Servicios Educativos</h2>
          <p className="text-muted-foreground">
            Explora y agrega al carrito los servicios que necesitas para tu hijo
          </p>
        </div>

        {categorias.map((categoria) => (
          <div key={categoria} className="mb-12">
            {/* Imagen de categoría */}
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-6 shadow-lg">
              <img
                src={categoriaImages[categoria]}
                alt={categoria}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                <h3 className="text-3xl md:text-4xl text-white p-8">
                  {categoria}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicios
                .filter((s) => s.categoria === categoria)
                .map((servicio) => {
                  const isAdded = addedItems.has(servicio.id);

                  return (
                    <Card key={servicio.id} className="overflow-hidden p-0">
                      {/* Imagen del servicio */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={servicio.imagen}
                          alt={servicio.nombre}
                          className="w-full h-full object-cover"
                        />
                        {servicio.gratuito && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-success text-white text-xs shadow-lg">
                            ✓ Gratuito
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${getCategoriaColor(categoria)} flex items-center justify-center flex-shrink-0`}>
                            {servicio.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg text-foreground mb-1">
                              {servicio.nombre}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {servicio.descripcion}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                          <div>
                            {servicio.gratuito ? (
                              <>
                                <p className="text-2xl text-success">
                                  Gratuito
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Sin costo adicional
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-2xl text-primary">
                                  ${servicio.precio.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {servicio.frecuencia}
                                </p>
                              </>
                            )}
                          </div>

                          <Button
                            variant={isAdded ? 'success' : 'primary'}
                            size="sm"
                            onClick={() => handleAddToCart(servicio)}
                          >
                            {isAdded ? '✓ Agregado' : 'Agregar'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
