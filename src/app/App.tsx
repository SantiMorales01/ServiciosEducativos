import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { ServicesMarketplace } from "./components/ServicesMarketplace";
import { ShoppingCartComponent } from "./components/ShoppingCart";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { CheckoutPage } from "./components/CheckoutPage";

type AppView =
  | "landing"
  | "services"
  | "cart"
  | "login"
  | "register"
  | "checkout"
  | "dashboard";

interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  frecuencia: string;
  cantidad: number;
  gratuito?: boolean;
}

interface UserData {
  nombre: string;
  email: string;
  documento: string;
}

interface ReservedService {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  fechaReserva: string;
}

export default function App() {
  const [currentView, setCurrentView] =
    useState<AppView>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    email: "",
    documento: "",
  });
  const [selectedSchoolId, setSelectedSchoolId] =
    useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reservedServices, setReservedServices] = useState<
    ReservedService[]
  >([]);

  // Monitor login state changes for debugging
  useEffect(() => {
    if (isLoggedIn) {
      console.log("✅ Usuario logueado:", userData.nombre);
      console.log("📍 Vista actual:", currentView);
    }
  }, [isLoggedIn, currentView, userData]);

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setCurrentView("services");
  };

  const handleAddToCart = (service: any) => {
    // Si el servicio es gratuito y el usuario está logueado, agregar a reservas
    if (service.gratuito && isLoggedIn) {
      setReservedServices((prev) => {
        const exists = prev.find((s) => s.id === service.id);
        if (exists) return prev;
        return [
          ...prev,
          {
            id: service.id,
            nombre: service.nombre,
            descripcion: service.descripcion,
            categoria: service.categoria,
            fechaReserva: new Date().toISOString(),
          },
        ];
      });
      return;
    }

    // Si el servicio es gratuito y NO está logueado, no agregar al carrito
    if (service.gratuito) {
      return;
    }

    // Servicios de pago van al carrito
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === service.id,
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === service.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...service, cantidad: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== itemId),
    );
  };

  const handleUpdateQuantity = (
    itemId: string,
    quantity: number,
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, cantidad: quantity }
          : item,
      ),
    );
  };

  const handleCheckout = () => {
    setCurrentView("login");
  };

  const handleLogin = (nombre: string, email: string) => {
    console.log("🔐 Iniciando sesión...", {
      nombre,
      email,
      itemsEnCarrito: cartItems.length,
    });

    // Actualizar datos del usuario
    setUserData({ nombre, email, documento: "" });

    // Activar estado de login
    setIsLoggedIn(true);

    // Redirigir según el estado del carrito
    if (cartItems.length > 0) {
      console.log("🛒 Redirigiendo al carrito...");
      setCurrentView("cart");
    } else {
      console.log("🏠 Redirigiendo a la página principal...");
      setCurrentView("landing");
    }
  };

  const handleRegister = (
    nombre: string,
    email: string,
    documento: string,
  ) => {
    setUserData({ nombre, email, documento });
    setIsLoggedIn(true);
    // Si hay items en el carrito, volver al carrito para que pueda proceder al pago
    if (cartItems.length > 0) {
      setCurrentView("cart");
    } else {
      setCurrentView("landing");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ nombre: "", email: "", documento: "" });
    setCartItems([]);
    setReservedServices([]);
    setCurrentView("landing");
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setIsLoggedIn(false);
    setUserData({ nombre: "", email: "", documento: "" });
    setCurrentView("landing");
  };

  // Marketplace Flow (No login required)
  if (!isLoggedIn) {
    switch (currentView) {
      case "landing":
        return (
          <LandingPage
            onSelectSchool={handleSelectSchool}
            cartItemsCount={cartItems.length}
            onViewCart={() => setCurrentView("cart")}
          />
        );

      case "services":
        return (
          <ServicesMarketplace
            schoolId={selectedSchoolId}
            onBack={() => setCurrentView("landing")}
            onAddToCart={handleAddToCart}
            onViewCart={() => setCurrentView("cart")}
            cartItemsCount={cartItems.length}
          />
        );

      case "cart":
        return (
          <ShoppingCartComponent
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onBack={() =>
              setCurrentView(
                selectedSchoolId ? "services" : "landing",
              )
            }
            onCheckout={handleCheckout}
            isLoggedIn={false}
          />
        );

      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            onShowRegister={() => setCurrentView("register")}
          />
        );

      case "register":
        return (
          <RegisterPage
            onRegister={handleRegister}
            onBackToLogin={() => setCurrentView("login")}
          />
        );

      default:
        return (
          <LandingPage
            onSelectSchool={handleSelectSchool}
            cartItemsCount={cartItems.length}
            onViewCart={() => setCurrentView("cart")}
          />
        );
    }
  }

  // User logged in - Check if in cart or checkout flow
  if (isLoggedIn && currentView === "cart") {
    return (
      <ShoppingCartComponent
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onBack={() => setCurrentView("dashboard")}
        onCheckout={() => setCurrentView("checkout")}
        isLoggedIn={true}
      />
    );
  }

  if (isLoggedIn && currentView === "checkout") {
    return (
      <CheckoutPage
        items={cartItems}
        userName={userData.nombre}
        userEmail={userData.email}
        onBack={() => setCurrentView("cart")}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  // Si el usuario está logueado pero no está en cart o checkout, mostrar landing
  if (isLoggedIn) {
    return (
      <LandingPage
        onSelectSchool={handleSelectSchool}
        cartItemsCount={cartItems.length}
        onViewCart={() => setCurrentView("cart")}
        isLoggedIn={true}
        userName={userData.nombre}
        onLogout={handleLogout}
      />
    );
  }

  // Este código nunca debería ejecutarse ya que se maneja arriba
  return null;
}