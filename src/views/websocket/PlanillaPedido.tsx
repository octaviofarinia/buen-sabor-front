import { useEffect, useState } from "react";
import { PedidoWS } from "../../Interfaces/PedidoWS";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"

var stompClient: any = null;

const PlanillaPedido = () => {
  const [conectado, setConectado] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<PedidoWS[]>([]);

  const getInstrumentos = () => {
    axios
      .get(`http://localhost:8080/api/v1/pedidos-ws`)
      .then((res) => {
        console.log(res.data)
        setPedidos(res.data)
      })
      .catch((err) =>
        console.error(err)
      );
  };

  const handleCambioEstado = async (id: number | null, estado: string) => {
    console.log("HANDLE CAMBIO ESTADO: " + id + " | " + estado);
    await axios.put("http://localhost:8080/api/v1/pedidos-ws/cambiar-estado", null, {
      params: {
        id: id,
        estado: estado
      }
    })
  };

  useEffect(() => {
    if (!conectado) {
      createSocket();
    }
  }, []);

  //WEB SOCKET
  const createSocket = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setConectado(true);
    getInstrumentos();
    stompClient.subscribe('/pedidos', onMessageReceived);
  }

  const onMessageReceived = (payload: any) => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    getInstrumentos();
  }

  const onError = (err: any) => {
    console.log(err);
  }

  if (!conectado) {
    return <div>Opening WebSocket</div>
  }

  return (
    <div className="">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha Modificación
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              return <tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {pedido.id}
                </th>
                <td className="px-6 py-4">${pedido.total}</td>
                <td className="px-6 py-4">{pedido.estado}</td>
                <td className="px-6 py-4">{pedido.fechaModificacion ? pedido.fechaModificacion : "---"}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleCambioEstado(pedido.id, "PREPARACION")}>
                    PREPARACION
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleCambioEstado(pedido.id, "ENTREGADO")}>
                    ENTREGADO
                  </button>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlanillaPedido;