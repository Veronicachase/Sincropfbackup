export const updateProjectById = async (projectId, projectData) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(projectData)
      });
  
      if (!response.ok) {
        throw new Error('No se han podido actualizar los cambios updateProjectById, revisar mi ProjectData, Si o hay respuespuesta al hacer el fetch. '); 
      }
  
      
      console.log("Cambios hechos" );
    } catch (error) {
      console.error('Error al hacer los cambios, fetch updateProjectById, no llega la info :', error);
     
      alert('Error al editar. Por favor, intenta de nuevo.');
    }
  };
  
