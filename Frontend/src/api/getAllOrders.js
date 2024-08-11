const apiUrl = import.meta.env.VITE_API_URL;

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Pedidos cargados correctamente:", data);
      return data;
    } else {
      throw new Error("Fallo en cargar los pedidos: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener tus pedidos:", error);
    throw error;
  }
};
