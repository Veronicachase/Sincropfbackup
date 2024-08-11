

const apiUrl = import.meta.env.VITE_API_URL;
export const getAllProjects = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/projects`, {
      method: "GET",
     headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Proyectos cargados correctamente:", data);
      return data;
    } else {
      throw new Error('Fallo en cargar los proyectos: ' + response.status);
    }
  } catch (error) {
    console.error("Error al obtener tus proyectos:", error);
    throw error;
  }
};
