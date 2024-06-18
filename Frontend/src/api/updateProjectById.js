export const updateProjectById = async (projectId, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
      method: 'PATCH',
      body: formData,
     
    });

    if (!response.ok) {
      throw new Error('No se han podido actualizar los cambios updateProjectById, revisar mi ProjectData, Si o hay respuespuesta al hacer el fetch. '); 
    }

    
    console.log("Cambios hechos" );
  } catch (error) {
    console.error('Error al hacer los cambios, fetch updateProjectById, no llega la info :', error);
   

  }
};

