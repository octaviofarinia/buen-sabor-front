import { createContext, useContext, useEffect, useState } from 'react';
import { DetallePedido } from '../Interfaces/DetallePedido';

interface CartContextProps {
  cart: DetallePedido[];
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

  useEffect(() => {
    const storedCart = localStorage.getItem('buenSaborCart');
    if (storedCart === null) {
      localStorage.setItem('buenSaborCart', JSON.stringify(cart));
    } else {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (detalle: DetallePedido) => {
    const existingProduct = cart.find(
      (detallePedido) => detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado
    );
  
    if (existingProduct) {
      existingProduct.cantidad += 1;
    } else {
      const newDetalle = { ...detalle, cantidad: 1 };
      cart.push(newDetalle);
    }
  
    localStorage.setItem('buenSaborCart', JSON.stringify(cart));
    setCart([...cart]); // Crear una nueva referencia del array para que React detecte el cambio
  };
  
  
  const removeFromCart = (detalle: DetallePedido) => {
    const updatedCart = cart.filter(
      (detallePedido) => detallePedido.idArticuloManufacturado !== detalle.idArticuloManufacturado
    );

    localStorage.setItem('buenSaborCart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const reduceAmountFromCart = (detalle: DetallePedido) => {
    for (const detallePedido of cart) {
      if (detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado) {
        if (detalle.cantidad === 1) {
          removeFromCart(detalle);
        } else {
          detalle.cantidad--;
          const newCart = [...cart];
          localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
          setCart(newCart);
        }
        break;
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, reduceAmountFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  return context;
};

export { CartContext, CartProvider };
