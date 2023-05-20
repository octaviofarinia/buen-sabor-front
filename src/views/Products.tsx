import { Producto } from '../Interfaces/Producto';
import { ProductCard } from '../components/ProductCard/ProductCard';

export const Products = () => {
  const ProductosPrueba: Producto[] = [
    {
      id: '1',
      nombre: 'Hamburguesa Rica',
      imgRoute: '/burgasMain.jpg',
      precio: 2100,
    },
    {
      id: '2',
      nombre: 'Pancho Rico',
      imgRoute: '/panchos.jpg',
      precio: 400,
    },
    { id: '3', nombre: 'Papas Fritas Ricas', imgRoute: 'papas.jpg', precio: 750 },
    { id: '4', nombre: 'Pizza Muzza Rica', imgRoute: 'pizza.jpg', precio: 2600 },
    { id: '5', nombre: 'Burga Dos Rica', imgRoute: 'burga.jpg', precio: 2100 },
    { id: '6', nombre: 'Pizza Napo Rica', imgRoute: 'pizza3.jpg', precio: 3200 },
    { id: '7', nombre: 'Pizza Morrones Rica', imgRoute: 'pizza2.jpg', precio: 2800 },

  ];
  return (
    <div className="bg-white dark:bg-neutral-800 pb-6">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 pt-4">Nuestra selección</h2>
        
      </div>
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
        {ProductosPrueba.map((producto) => (
          <ProductCard producto={producto} key={producto.id} />
        ))}
      </div>
    </div>
  </div>
  );
};
