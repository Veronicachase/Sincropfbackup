export const getTaskById = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Tarea obtenido correctamente, getTaskById:", data);
      return data;
    } else {
      throw new Error("Failed to get task with status: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw error;
  }
};
