import { useEffect, useState } from "react";

interface Order {
    id: number;
    customerName: string;
    total: number;
    createdAt: string;
    status?: string; // Hacemos opcional por si no viene del back
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Función para pedir los datos
    const fetchOrders = () => {
        fetch("http://localhost:3001/orders")
            .then((res) => res.json())
            .then((data) => {
                // Ordenamos: El más nuevo primero (por ID descendente)
                // @ts-ignore
                const sortedData = data.sort((a, b) => b.id - a.id);
                setOrders(sortedData);
                setLoading(false);
            })
            .catch((err) => console.error("Error conectando al backend:", err));
    };

    useEffect(() => {
        // 1. Cargar inmediatamente al entrar
        fetchOrders();

        // 2. Configurar el "Auto-Refresco" cada 3 segundos
        const intervalId = setInterval(fetchOrders, 3000);

        // 3. Limpieza: Apagar el timer si me salgo de la página
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Panel de Administración (Tiempo Real)
                    </h1>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded border border-green-400">
                        🟢 En vivo: Actualizando cada 3s
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-600">Cargando pedidos...</p>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        {/* AQUI AGREGAMOS text-gray-900 PARA QUE SE VEA NEGRO FUERTE */}
                                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-900 font-medium">
                                            #{order.id}
                                        </td>
                                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-900">
                                            {order.customerName}
                                        </td>
                                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-bold text-green-700">
                                            S/ {Number(order.total).toFixed(2)}
                                        </td>
                                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Pagado</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}