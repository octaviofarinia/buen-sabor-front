import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const FakeCartView = () => {
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState({ quantity: "1", price: "10", amount: 10, description: "Some book" });

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setPreferenceId("123456789");
            setIsLoading(false);
        }, 2000);
    };

    const renderSpinner = () => {
        if (isLoading) {
            return (
                <div className="mx-auto mt-10">
                    <div className="font-bold text-xl">CREANDO PREFERENCIA...</div>
                    <ClipLoader size={45} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            )
        }
    }

    const renderCarrito = () => {
        if (isLoading) return null;

        return (
            <>
                <h1 className="mx-auto mt-5 text-5xl font-bold">CARRITO</h1>
                <div className="mx-auto my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                PRODUCTO XXXX
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Esta es una descripcion de un producto falso xd.
                        </p>
                        <button
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleClick}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const renderCheckout = () => {
        return (
            <>
                <h1 className="mx-auto mt-5 text-5xl font-bold">CHECKOUT - {preferenceId}</h1>
                <div className="mx-auto my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                PRODUCTO XXXX
                            </h5>
                        </a>
                        <button
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={handleClick}
                        >
                            Confirmar Compra
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {renderSpinner()}
            {preferenceId ? renderCheckout() : renderCarrito()}
        </>
    )
}

export default FakeCartView;