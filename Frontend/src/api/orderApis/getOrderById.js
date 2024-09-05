const apiUrl = import.meta.env.VITE_API_URL;
export const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Failed to get order with status: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error;
  }
};
