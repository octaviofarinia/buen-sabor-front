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
    <div className="bg-white  pb-6 ">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Nuestra selección</h2>
          <a
            href="#"
            className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            Ver mas 
          </a>
        </div>
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {ProductosPrueba.map((producto) => (
            <ProductCard producto={producto}/>
          ))}
        </div>
      </div>
    </div>
  );
};
