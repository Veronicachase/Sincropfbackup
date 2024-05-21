export const updateTaskById = async (taskId, taskData) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(taskData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('No se han podido actualizar los cambios en update Task'); 
      }
  
      
      console.log("Cambios hechos");
    } catch (error) {
      console.error('Error al hacer los cambios:', error);
     
      alert('Error al editar. Por favor, intenta de nuevo.');
    }
  };
  
  