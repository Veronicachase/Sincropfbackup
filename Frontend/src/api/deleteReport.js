export const deleteReport = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Fallo en eliminar el reporte: ' + response.status);
      }
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      throw error;
    }
  };