
const apiUrl = import.meta.env.VITE_API_URL;
export const updateTaskById = async (taskId, taskData) => {
  console.log("Tareas enviadas / pasando por el fetch updateTaskById:", taskData); 
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
     
      body: taskData,
    });

    if (!response.ok) {
      throw new Error('No se han podido actualizar los cambios en update Task');
    }

    console.log("Cambios hechos");
  } catch (error) {
    console.error('Error al hacer los cambios:', error);
    throw error;
  }
};



