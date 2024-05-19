export const getAllOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Pedidos cargados correctamente:", data);
        return data;
      } else {
        throw new Error('Fallo en cargar los pedidos: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener tus pedidos:", error);
      throw error;
    }
  };