
const apiUrl = import.meta.env.VITE_API_URL;
export const getAllTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/tasks/`, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Tareas cargadas correctamente:", data);
        return data;
      } else {
        throw new Error('Fallo en cargar las tareas: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener tus tareas:", error);
      throw error;
    }
  };