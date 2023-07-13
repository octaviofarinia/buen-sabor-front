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

  const addToCart = async (detalle: DetallePedido) => {
    let addProduct = false;
    for (const detallePedido of cart) {
      if (detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado) {
        detalle.cantidad = detallePedido.cantidad++;
        const newCart = [...cart];
        setCart([...cart]);
        localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
        addProduct = true;
        break;
      }
    }

    if (addProduct === false) {
      const newCart = [...cart, detalle];
      setCart([...cart, detalle]);
      localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (detalle: DetallePedido) => {
    for (const detallePedido of cart) {
      if (detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado) {
        cart.splice(cart.indexOf(detallePedido), 1);
        const newCart = [...cart];
        localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
        setCart([...cart]);
        break;
      }
    }
  };
  const reduceAmountFromCart = (detalle: DetallePedido) => {
    for (const detallePedido of cart) {
      if (detallePedido.idArticuloManufacturado === detalle.idArticuloManufacturado) {
        detalle.cantidad = detalle.cantidad--;
        const newCart = [...cart];
        localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
        setCart([...cart]);
        break;
      }
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, reduceAmountFromCart }}
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
