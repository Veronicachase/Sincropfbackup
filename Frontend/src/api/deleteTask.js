const apiUrl = import.meta.env.VITE_API_URL;

export const deleteTask = async (taskId) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar la tarea');
      }

    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      
    }
  };
  