export const getTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Proyecto obtenido correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to get task with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
    }
  };