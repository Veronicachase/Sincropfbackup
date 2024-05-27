export const getTaskBySection = async (projectId, sectionKey) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${projectId}/${sectionKey}`, {
      method: "GET",
    });

    if (response.ok) {
      // console.log('Respuesta', await response.json())
      const tasks = await response.json(); 

      console.log("Tareas obtenidas correctamente:", tasks);

      
      // return tasks.filter(task => task.sectionKey === sectionKey && task.sectionIsActive);
      return tasks;
    } else {
      throw new Error('Ha habido un fallo al obtener el estatus de la tarea: ' + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw error;
  }
};
