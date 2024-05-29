export const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error('Error actualizando el estado de la tarea');
      }
    } catch (error) {
      console.error('Error actualizando el estado de la tarea:', error);
      throw error;
    }
  };
  