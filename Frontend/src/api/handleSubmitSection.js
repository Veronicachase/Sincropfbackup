export const handleSubmitSection = async (projectId, newSection) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: newSection }),
      });
  
        if (!response.ok) {
            throw new Error('No se pudo agregar la nueva sección');
        }
  
        const result = await response.json();
        console.log('Nueva sección agregada exitosamente:', result);
  
        // Actualizar el estado del proyecto con la nueva sección
        setProject((prevProject) => ({
            ...prevProject,
            sections: [...prevProject.sections, newSection],
        }));
  
        handleClose();
    } catch (error) {
        console.error('Error al agregar la sección:', error);
    }
  };
  

  