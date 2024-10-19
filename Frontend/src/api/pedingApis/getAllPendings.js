const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPendings = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/pendings/`, {
      method: "GET",
      headers: {
       
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Fallo en cargar las tareas: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener tus tareas:", error);
    throw error;
  }
};
