const apiUrl = import.meta.env.VITE_API_URL;
export const updateOrder = async (orderId, orderData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar el pedido");
    }
  } catch (error) {
    console.error(
      "Error al hacer los cambios en pedidos-orden-materiales:",
      error
    );
  }
};
