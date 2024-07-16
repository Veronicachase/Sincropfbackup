export const deleteProject = async (projectId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el proyecto');
    }
    return projectId;
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    throw error;
  }
};

  