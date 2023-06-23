import { createContext, useContext, useEffect, useState } from 'react';
import { Producto } from '../Interfaces/ABM/Producto';

interface CartContextProps {
  cart: Producto[];
  addToCart: (product: Producto) => void;
  removeFromCart: (product: Producto) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Producto[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('buenSaborCart');
    if (storedCart === null) {
      localStorage.setItem('buenSaborCart', JSON.stringify(cart));
    } else {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = async (product: Producto) => {
    const newCart = [...cart, product];
    setCart([...cart, product]);
    localStorage.setItem('buenSaborCart', JSON.stringify(newCart));
  };

  const removeFromCart = (product: Producto) => {
    const newCart=cart.filter((producto) => producto.id !== product.id);
    setCart(newCart);
    localStorage.setItem('buenSaborCart', JSON.stringify(newCart));

  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  return context;
};

export { CartContext, CartProvider };
