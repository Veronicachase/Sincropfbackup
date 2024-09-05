const apiUrl = import.meta.env.VITE_API_URL;
export const getReportsById = async (reportId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/reports/${reportId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("fallo al obtener el reporte: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    throw error;
  }
};
