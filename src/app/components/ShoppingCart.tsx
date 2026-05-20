import { Button } from './Button';
import { Card } from './Card';
import { ChatbotWidget } from './ChatbotWidget';
import { ThemeToggle } from './ThemeToggle';
import { X, ShoppingCart, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  frecuencia: string;
  cantidad: number;
  gratuito?: boolean;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onBack: () => void;
  onCheckout: () => void;
  isLoggedIn?: boolean;
}

export function ShoppingCartComponent({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onBack,
  onCheckout,
  isLoggedIn = false,
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => {
    if (item.gratuito) return sum;
    return sum + item.precio * item.cantidad;
  }, 0);
  const descuento = subtotal > 300000 ? subtotal * 0.1 : 0;
  const total = subtotal - descuento;

  const serviciosPagos = items.filter(item => !item.gratuito);
  const serviciosGratuitos = items.filter(item => item.gratuito);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 h-16">
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-accent transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <ShoppingCart size={24} className="text-primary" />
            <div className="flex-1">
              <h1 className="text-lg text-foreground">Mi Carrito</h1>
              <p className="text-xs text-muted-foreground">
                {items.length} {items.length === 1 ? 'servicio' : 'servicios'}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl text-foreground mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega servicios educativos para continuar
            </p>
            <Button variant="primary" onClick={onBack}>
              Ver Servicios
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl text-foreground mb-4">Servicios Seleccionados</h2>

              {items.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-foreground mb-1">{item.nombre}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.descripcion}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, Math.max(1, item.cantidad - 1))
                            }
                            className="w-8 h-8 rounded-lg border-2 border-border hover:bg-accent transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-foreground">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                            className="w-8 h-8 rounded-lg border-2 border-border hover:bg-accent transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex-1">
                          {item.gratuito ? (
                            <>
                              <p className="text-lg text-success">
                                Gratuito
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Sin costo
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-lg text-primary">
                                ${(item.precio * item.cantidad).toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.frecuencia}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-xl text-foreground mb-4">Resumen del Pedido</h3>

                <div className="space-y-3 mb-4 pb-4 border-b-2 border-border">
                  {serviciosGratuitos.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Servicios gratuitos</span>
                      <span className="text-success">{serviciosGratuitos.length}</span>
                    </div>
                  )}

                  {serviciosPagos.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toLocaleString()}</span>
                    </div>
                  )}

                  {descuento > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-success">Descuento (10%)</span>
                      <span className="text-success">-${descuento.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg text-foreground">Total a pagar</span>
                  <span className="text-2xl text-primary">
                    {total === 0 ? 'Gratuito' : `$${total.toLocaleString()}`}
                  </span>
                </div>

                {descuento === 0 && subtotal > 0 && subtotal < 300000 && (
                  <div className="bg-secondary/10 rounded-xl p-3 mb-4">
                    <p className="text-xs text-secondary">
                      💰 Agrega ${(300000 - subtotal).toLocaleString()} más para obtener un 10% de descuento
                    </p>
                  </div>
                )}

                <Button variant="primary" fullWidth size="lg" onClick={onCheckout}>
                  {isLoggedIn
                    ? 'Proceder al Pago'
                    : total === 0
                    ? 'Solicitar Servicios'
                    : 'Iniciar Sesión para Continuar'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {isLoggedIn
                    ? 'Selecciona tu método de pago preferido en la siguiente pantalla'
                    : total === 0
                    ? 'Los servicios gratuitos requieren registro para su asignación'
                    : 'Al continuar, te pediremos iniciar sesión o crear una cuenta'}
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
