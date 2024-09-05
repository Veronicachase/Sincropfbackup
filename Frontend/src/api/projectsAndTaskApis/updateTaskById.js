const apiUrl = import.meta.env.VITE_API_URL;
export const updateTaskById = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: taskData,
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar los cambios en update Task");
    }
  } catch (error) {
    console.error("Error al hacer los cambios:", error);
    throw error;
  }
};
