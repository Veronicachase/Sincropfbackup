const apiUrl = import.meta.env.VITE_API_URL;
export const getProjectById = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "GET",
      headers: {
       
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Failed to get project with status: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    throw error;
  }
};
