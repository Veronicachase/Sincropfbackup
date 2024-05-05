export const getProjectById = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Proyecto obtenido correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to get project with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener el proyecto:", error);
      throw error;
    }
  };