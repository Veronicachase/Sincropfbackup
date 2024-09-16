const apiUrl = import.meta.env.VITE_API_URL;
export const getTaskBySection = async (projectId, sectionKey) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tasks/${projectId}/${sectionKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const tasks = await response.json();

      //return tasks.filter(task => task.sectionKey === sectionKey && task.sectionIsActive);

      return tasks.length > 0 ? tasks : null;
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error("Ha habido un fallo al obtener el estatus de la tarea");
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw error;
  }
};
