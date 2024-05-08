export const getAllProjects = async () => {
    try {
      const response = await fetch(`http://localhost:3000/projects`, {
        method: "GET",
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