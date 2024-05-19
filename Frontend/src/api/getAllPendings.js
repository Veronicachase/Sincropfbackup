export const getAllPendings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pendings/`, {
        method: "GET",
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