export const deleteTask = async (taskId) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
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
  