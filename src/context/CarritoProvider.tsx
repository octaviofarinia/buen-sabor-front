import { createContext, useContext, useEffect, useState } from 'react';
import { DetallePedido } from '../Interfaces/ClientSide/DetallePedido';
import { useAuth0 } from '@auth0/auth0-react';

interface CartContextProps {
  cart: DetallePedido[];
  resetCart: () => void;
  addToCart: (detalle: DetallePedido) => void;
  removeFromCart: (detalle: DetallePedido) => void;
  reduceAmountFromCart: (detalle: DetallePedido) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<DetallePedido[]>([]);
  const { user, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (user?.sub !== undefined) {
      const storedCart = localStorage.getItem('buenSaborCart' + user?.sub);
      if (storedCart === null) {
        localStorage.setItem('buenSaborCart' + user.sub, JSON.stringify(cart));
      } else {
        setCart(JSON.parse(storedCart));
      }
    }

    return () => {};
  }, [user?.sub]);

  const resetCart = () => {
    setCart([]);
    localStorage.setItem('buenSaborCart' + user?.sub, JSON.stringify([]));
  };
  const addToCart = async (detalle: DetallePedido) => {
    if (user?.sub === undefined) {
      await loginWithRedirect({
        appState: {
          returnTo: `/Productos`,
        },
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    }
    if (user?.sub !== undefined) {
      const existingProduct = cart.find(
        (detallePedido) => detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado
      );

      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        const newDetalle = { ...detalle, cantidad: 1 };
        cart.push(newDetalle);
      }
      localStorage.setItem('buenSaborCart' + user?.sub, JSON.stringify(cart));

      setCart([...cart]);
    }
  };

  const removeFromCart = async (detalle: DetallePedido) => {
    if (user?.sub === undefined) {
      await loginWithRedirect({
        appState: {
          returnTo: `/Productos`,
        },
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    }
    if (user?.sub !== undefined) {
      const updatedCart = cart.filter(
        (detallePedido) => detallePedido.idArticuloManufacturado !== detalle.idArticuloManufacturado
      );
      localStorage.setItem('buenSaborCart' + user?.sub, JSON.stringify(updatedCart));
        setCart(updatedCart);
    }
  };
  
  const reduceAmountFromCart = async (detalle: DetallePedido) => {
    if (user?.sub === undefined) {
      await loginWithRedirect({
        appState: {
          returnTo: `/Carrito`,
        },
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    }
    if (user?.sub !== undefined) {
      for (const detallePedido of cart) {
        if (detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado) {
          if (detalle.cantidad === 1) {
            // Si la cantidad es 1, eliminar el artículo del carrito
            removeFromCart(detalle);
          } else {
            // Reducir la cantidad en 1
            detallePedido.cantidad--;
            // Actualizar el carrito con la nueva cantidad
            const newCart = [...cart];
            // Guardar el carrito actualizado en el almacenamiento local
            localStorage.setItem('buenSaborCart' + user.sub, JSON.stringify(newCart));
            // Actualizar el estado del carrito en el componente
            setCart(newCart);
          }
          break;
        }
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, reduceAmountFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  return context;
};

export { CartContext, CartProvider };
