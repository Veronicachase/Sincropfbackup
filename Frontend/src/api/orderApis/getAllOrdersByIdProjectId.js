const apiUrl = import.meta.env.VITE_API_URL;
export const getAllOrdersByProjectId = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/api/orders/${projectId}`, {
      method: "GET",
      headers: {
       
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Fallo en cargar las pedidos: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener tus pedidos:", error);
    throw error;
  }
};
