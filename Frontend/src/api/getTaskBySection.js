export const getTaskBySection = async (projectId, sectionKey) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${projectId}/${sectionKey}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Tarea obtenida correctamente:", data);
      if (data.prevImages) {
        console.log("Imagenes previas:", data.prevImages);
      }
      if (data.finalImages) {
        console.log("Imagenes finales:", data.finalImages);
      }
      return data;
    } else {
      throw new Error('Ha habido un fallo al obtener el estatus de la tarea: ' + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw error;
  }
};