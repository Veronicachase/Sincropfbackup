
const apiUrl = import.meta.env.VITE_API_URL;
export const getTaskBySection = async (projectId, sectionKey) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/tasks/${projectId}/${sectionKey}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    
    });

    if (response.ok) {
      // console.log('Respuesta', await response.json())
      const tasks = await response.json(); 

      console.log("Tareas obtenidas correctamente:", tasks);

      
       //return tasks.filter(task => task.sectionKey === sectionKey && task.sectionIsActive);
      return tasks;
    } else {
      throw new Error('Ha habido un fallo al obtener el estatus de la tarea: ' + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw error;
  }
};
