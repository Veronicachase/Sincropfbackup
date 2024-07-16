const updateSection = async (projectId, sectionKey, sectionData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/projects/${projectId}/sections/${sectionKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sectionData)
      });
  
      if (!response.ok) {
        throw new Error('No se pudo actualizar la sección');
      }
  
      console.log("Sección actualizada exitosamente");
    } catch (error) {
      console.error('Error al actualizar la sección:', error);

    }
  };
  
  export default updateSection;
  

 