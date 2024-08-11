const apiUrl = import.meta.env.VITE_API_URL;
export const getProjectById = async (projectId) => {

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Proyecto obtenido correctamente:", data);

      // if (typeof data.sections === 'string') {
      //   data.sections = JSON.parse(data.sections);  
      // }
      return data;
    } else {
      throw new Error('Failed to get project with status: ' + response.status);
    }
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    throw error;
  }
};