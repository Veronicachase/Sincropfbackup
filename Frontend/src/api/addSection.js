const addSection = async (projectId, newSectionData) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSectionData)
      });
  
      if (!response.ok) {
        throw new Error('No se pudo agregar la nueva sección');
      }
  
      console.log("Nueva sección agregada exitosamente");
    } catch (error) {
      console.error('Error al agregar la sección:', error);
      alert('Error al agregar la sección. Por favor, intenta de nuevo.');
    }
  };
  
  export default addSection;
  