const deleteSectionById = async (projectId, sectionKey) => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${projectId}/sections/${sectionKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar la sección'); 
    }

    
    console.log("Sección eliminada");
  } catch (error) {
    console.error('Error al eliminar la sección:', error);
   
    alert('Error al eliminar la sección. Por favor, intenta de nuevo.');
  }
};

export default deleteSectionById;
