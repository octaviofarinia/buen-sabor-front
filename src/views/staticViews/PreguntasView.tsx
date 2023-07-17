export const PreguntasView = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 ">
      <div className="mx-auto my-14 max-w-screen-xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-neutral-800 dark:text-neutral-100 md:mb-6 lg:text-3xl">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-neutral-500 dark:text-neutral-300 md:text-lg">
            Bienvenido/a a nuestra sección de Preguntas Frecuentes. Hemos recopilado las consultas
            más comunes que recibimos de nuestros clientes para brindarte respuestas claras y
            concisas. Esperamos que esta sección te ayude a resolver cualquier duda que puedas
            tener. Si no encuentras la respuesta que buscas, no dudes en ponerte en contacto con
            nuestro equipo de soporte, quienes estarán encantados de asistirte.
          </p>
        </div>
        {/* text - end */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
          {/* question - start */}
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Cómo puedo realizar un pedido?
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              Para realizar un pedido, simplemente navega por nuestra tienda en línea, selecciona
              los productos que deseas y agrégalos al carrito de compras. Luego, sigue los pasos
              para completar la información de envío y pago. Una vez que hayas finalizado, recibirás
              una confirmación de pedido por correo electrónico.
            </p>
          </div>
          {/* question - end */}
          {/* question - start */}
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Cuáles son las opciones de pago disponibles?
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              Actualmente solo aceptamos efectivo y Mercado Pago. Durante el proceso de pago, verás
              las opciones disponibles y podrás elegir la que mejor se adapte a tus necesidades.
            </p>
          </div>
          {/* question - end */}
          {/* question - start */}
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Cuánto tiempo tardará en llegar mi pedido?
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              El tiempo de entrega puede variar dependiendo de tu ubicación y el método de envío
              seleccionado. Ten en cuenta que esto dependera si deseas delivery o take away.
            </p>
          </div>
          {/* question - end */}
          {/* question - start */}
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Puedo realizar cambios en mi pedido después de haberlo realizado?
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              Si necesitas realizar cambios en tu pedido, como modificar la dirección de envío o
              agregar/quitar productos, te recomendamos que te pongas en contacto con nuestro equipo
              de soporte lo antes posible. Haremos todo lo posible para ayudarte, pero debes tener
              en cuenta que una vez que el pedido haya sido enviado, es posible que no podamos
              realizar modificaciones.
            </p>
          </div>
          {/* question - end */}
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Cuál es la política de devoluciones y reembolsos?{' '}
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              Nos preocupamos por tu satisfacción y ofrecemos una política de valoraciones. Si por
              alguna razón no estás satisfecho/a con tu compra, puedes comunicarte con nuestro
              equipo de soporte dentro de un plazo determinado para comentar tus molestias.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-5 shadow-md hover:shadow-lg dark:bg-neutral-600 dark:hover:shadow-neutral-700">
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4 ">
              <h3 className="font-semibold text-amber-500 sm:text-lg md:text-xl">
                ¿Dónde nos encontramos?
              </h3>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-300">
              Nos encontramos en una ubicación privilegiada, en el corazón de Mendoza. Nuestro local
              está convenientemente situada en la siguiente dirección:
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.014839043154!2d-68.8560345233001!3d-32.89777592361352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0908d5e865c5%3A0xb5ec70786453a73!2sUTN%20Facultad%20Regional%20Mendoza!5e0!3m2!1ses-419!2sar!4v1688360580120!5m2!1ses-419!2sar"
              className="h-52 w-full"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
