import { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { CreditCard, CheckCircle, DollarSign, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  frecuencia: string;
  cantidad: number;
  gratuito?: boolean;
}

interface CheckoutPageProps {
  items: CartItem[];
  userName: string;
  userEmail: string;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export function CheckoutPage({
  items,
  userName,
  userEmail,
  onBack,
  onPaymentSuccess,
}: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'wompi' | 'bancolombia' | 'pse'>('wompi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Datos de pago
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(userName);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const subtotal = items.reduce((sum, item) => {
    if (item.gratuito) return sum;
    return sum + item.precio * item.cantidad;
  }, 0);
  const descuento = subtotal > 300000 ? subtotal * 0.1 : 0;
  const total = subtotal - descuento;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulación de proceso de pago
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 2500);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl text-foreground mb-3">¡Pago Exitoso!</h2>
          <p className="text-muted-foreground mb-6">
            Tu transacción ha sido procesada correctamente. En breve recibirás un correo de
            confirmación.
          </p>
          <div className="bg-accent rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Total pagado</p>
            <p className="text-2xl text-primary">${total.toLocaleString()}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Redirigiendo al panel de control...
          </p>
        </Card>
      </div>
    );
  }

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
              <CreditCard size={24} className="text-primary" />
              <div>
                <h1 className="text-lg text-foreground">Finalizar Compra</h1>
                <p className="text-xs text-muted-foreground">Pago seguro</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl text-foreground mb-6">Método de Pago</h2>

              {/* Selector de método de pago */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('wompi')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'wompi'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="text-center">
                    <DollarSign size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-foreground">Wompi</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('bancolombia')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'bancolombia'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="text-center">
                    <CreditCard size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-foreground">Bancolombia</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('pse')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'pse'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="text-center">
                    <CreditCard size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-foreground">PSE</p>
                  </div>
                </button>
              </div>

              {/* Formulario de tarjeta */}
              <form onSubmit={handlePayment} className="space-y-4">
                <Input
                  label="Nombre en la tarjeta"
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />

                <Input
                  label="Número de tarjeta"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '');
                    if (value.length <= 16) {
                      setCardNumber(value.replace(/(\d{4})/g, '$1 ').trim());
                    }
                  }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Fecha de expiración"
                    type="text"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        const formatted =
                          value.length >= 2
                            ? `${value.slice(0, 2)}/${value.slice(2)}`
                            : value;
                        setExpiryDate(formatted);
                      }
                    }}
                  />

                  <Input
                    label="CVV"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 3) {
                        setCvv(value);
                      }
                    }}
                  />
                </div>

                <div className="bg-accent/50 rounded-xl p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground mb-1">Pago 100% seguro</p>
                      <p className="text-xs text-muted-foreground">
                        Tu información está protegida con encriptación de nivel bancario. No
                        almacenamos datos de tarjetas.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Procesando...' : `Pagar $${total.toLocaleString()}`}
                </Button>
              </form>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-xl text-foreground mb-4">Resumen del Pedido</h3>

              <div className="space-y-3 mb-4 pb-4 border-b-2 border-border">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex-1">
                      {item.nombre} x{item.cantidad}
                    </span>
                    <span className="text-foreground">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b-2 border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toLocaleString()}</span>
                </div>

                {descuento > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-success">Descuento (10%)</span>
                    <span className="text-success">-${descuento.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-lg text-foreground">Total</span>
                <span className="text-2xl text-primary">${total.toLocaleString()}</span>
              </div>

              <div className="bg-primary/5 rounded-xl p-3">
                <p className="text-xs text-primary">
                  💳 Métodos de pago: Tarjetas de crédito/débito, PSE, Wompi, Bancolombia
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
