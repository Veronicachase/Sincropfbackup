
const apiUrl = import.meta.env.VITE_API_URL;
export const deleteReport = async (projectId, reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/projects/${projectId}/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
        
        'Authorization': `Bearer ${token}` 
      },
      });
      if (!response.ok) {
        throw new Error('Fallo en eliminar el reporte: ' + response.status);
      }
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      throw error;
    }
  };
