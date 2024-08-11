const apiUrl = import.meta.env.VITE_API_URL;
export const updateTaskStatus = async (taskId, status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Error actualizando el estado de la tarea");
    }
  } catch (error) {
    console.error("Error actualizando el estado de la tarea:", error);
    throw error;
  }
};
