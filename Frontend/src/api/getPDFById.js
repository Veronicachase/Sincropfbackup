export const getReportsById = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:3000/reports/${reportId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Reporte PDF obtenido correctamente:", data);
        return data;
      } else {
        throw new Error('fallo al obtener el reporte: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener el reporte:", error);
      throw error;
    }
  };