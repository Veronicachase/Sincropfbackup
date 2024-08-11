
const apiUrl = import.meta.env.VITE_API_URL;
export const deleteProject = async (projectId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
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

  