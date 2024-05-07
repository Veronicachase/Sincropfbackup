const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http:localhost:3000/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar la tarea');
      }
  
    
      setTaskData(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea. Por favor, intenta de nuevo.');
    }
  };
  export default deleteTask