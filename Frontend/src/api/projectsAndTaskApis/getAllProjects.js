

const apiUrl = import.meta.env.VITE_API_URL;
export const getAllProjects = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/projects`, {
      method: "GET",
     headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });
    if (response.ok) {
      const data = await response.json();

      if (data.length === 0) {
        return { status: 'empty', data: null };  
      }

      return { status: 'success', data };

    } else if (response.status === 404) {
      return { status: 'empty', data: null };
    } else {
      throw new Error('Fallo en cargar los proyectos: ' + response.status);
    }

  } catch (error) {
    console.error("Error al obtener tus proyectos:", error);
    return { status: 'error', error: error.message };
  }
};
