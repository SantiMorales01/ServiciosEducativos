import { useState } from 'react';
import { Button } from './Button';
import { GraduationCap, School, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Card } from './Card';
import { ChatbotWidget } from './ChatbotWidget';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onSelectSchool: (schoolId: string) => void;
  cartItemsCount: number;
  onViewCart: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function LandingPage({
  onSelectSchool,
  cartItemsCount,
  onViewCart,
  isLoggedIn = false,
  userName = '',
  onLogout
}: LandingPageProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const colegios = [
    {
      id: 'colegio-1',
      nombre: 'Colegio Champagnat',
      ubicacion: 'Ibagué, Tolima',
      imagen: '/public/Champagnat.jpg',
      descripcion: 'Educación bilingüe de excelencia',
      tipo: 'Mixto',
      idioma: 'Bilingüe: Español - Inglés',
    },
    {
      id: 'colegio-2',
      nombre: 'Colegio Franciscano Jiménez De Cisneros',
      ubicacion: 'Ibagué, Tolima',
      imagen: '/public/cisneros.jpg',
      servicios: 11,
      descripcion: 'Tradición franciscana y académica',
      tipo: 'Mixto',
      idioma: 'Español',
    },
    {
      id: 'colegio-3',
      nombre: 'Colegio Inglés',
      ubicacion: 'Ibagué, Tolima',
      imagen: '/public/ingles.png',
      servicios: 10,
      descripcion: 'Inmersión total en inglés',
      tipo: 'Mixto',
      idioma: 'Bilingüe: Español - Inglés',
    },
    {
      id: 'colegio-4',
      nombre: 'Institución Educativa Camila Molano',
      ubicacion: 'Venadillo, Tolima',
      imagen: '/public/Camila Molano.jpg',
      servicios: 10,
      descripcion: 'Formación integral y valores',
      tipo: 'Mixto',
      idioma: 'Español',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-xl text-foreground">EduService</h1>
                <p className="text-xs text-muted-foreground">Marketplace Educativo</p>
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

              {isLoggedIn && userName && onLogout && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-accent transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User size={18} />
                    </div>
                    <span className="hidden sm:block text-sm text-foreground max-w-[150px] truncate">
                      {userName}
                    </span>
                  </button>

                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl border-2 border-border shadow-lg z-50">
                        <div className="p-3 border-b-2 border-border">
                          <p className="text-sm text-foreground truncate">{userName}</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 p-3 hover:bg-accent text-destructive transition-colors"
                        >
                          <LogOut size={18} />
                          <span className="text-sm">Cerrar Sesión</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl text-foreground mb-6 leading-tight">
              Todos los servicios educativos de <span className="text-primary">Ibagué y Venadillo</span> en un solo lugar
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Selecciona el colegio de tu hijo y accede a servicios de transporte, comedor, actividades extracurriculares y mucho más
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar colegio por nombre o ubicación..."
                className="w-full h-14 rounded-2xl border-2 border-border bg-white dark:bg-gray-800 dark:text-white pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl text-foreground mb-2">Colegios de Ibagué y Venadillo</h2>
            <p className="text-lg text-muted-foreground">Selecciona el colegio de tu interés para ver los servicios disponibles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {colegios
              .filter((colegio) => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  colegio.nombre.toLowerCase().includes(query) ||
                  colegio.ubicacion.toLowerCase().includes(query) ||
                  colegio.descripcion.toLowerCase().includes(query)
                );
              })
              .map((colegio) => (
              <Card
                key={colegio.id}
                hover
                className="cursor-pointer overflow-hidden p-0 shadow-md"
                onClick={() => onSelectSchool(colegio.id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={colegio.imagen}
                    alt={colegio.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg text-foreground mb-2">{colegio.nombre}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{colegio.ubicacion}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 rounded-lg bg-accent text-xs text-muted-foreground">
                      {colegio.tipo}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      colegio.idioma.includes('Bilingüe')
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {colegio.idioma}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{colegio.descripcion}</p>

                  <div className="pt-4 border-t-2 border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Servicios disponibles</span>
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
                        {colegio.servicios}
                      </span>
                    </div>

                    <Button variant="primary" fullWidth>
                      Ver Servicios
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {colegios.filter((colegio) => {
              if (!searchQuery) return false;
              const query = searchQuery.toLowerCase();
              return (
                colegio.nombre.toLowerCase().includes(query) ||
                colegio.ubicacion.toLowerCase().includes(query) ||
                colegio.descripcion.toLowerCase().includes(query)
              );
            }).length === 0 && searchQuery && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No se encontraron colegios que coincidan con "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4">¿Por qué elegir EduService?</h2>
            <p className="text-lg text-muted-foreground">La mejor plataforma para gestionar servicios educativos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <School size={40} />
              </div>
              <h3 className="text-xl text-foreground mb-3">Múltiples Colegios</h3>
              <p className="text-sm text-muted-foreground">
                Encuentra servicios de instituciones educativas del Tolima
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={40} />
              </div>
              <h3 className="text-xl text-foreground mb-3">Contratación Fácil</h3>
              <p className="text-sm text-muted-foreground">
                Agrega servicios al carrito y contrata en minutos
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-2xl bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
                <GraduationCap size={40} />
              </div>
              <h3 className="text-xl text-foreground mb-3">Gestión Unificada</h3>
              <p className="text-sm text-muted-foreground">
                Administra todos los servicios desde un solo lugar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t-2 border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 EduService - Marketplace Educativo - Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
