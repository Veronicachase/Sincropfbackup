const apiUrl = import.meta.env.VITE_API_URL;

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/orders/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.length === 0) {
        console.log("No se han encontrado pedidos"); 
        return [];
      }
     
      return data;
      
    } else {
      throw new Error(`Error al obtener pedidos: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener tus pedidos:", error);
    throw error;
  }
};
