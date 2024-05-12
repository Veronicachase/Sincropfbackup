export const getOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Pedido obtenido correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to get order with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      throw error;
    }
  };