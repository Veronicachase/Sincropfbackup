export const getAllSections = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sections`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Secciones cargadas correctamente:", data);
        return data;
      } else {
        throw new Error('Fallo en cargar las secciones: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener las secciones:", error);
      throw error;
    }
  };