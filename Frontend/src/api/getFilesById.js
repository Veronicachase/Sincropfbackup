export const getFilesById = async (filesId) => {
    try {
      const response = await fetch(`http://localhost:3000/files/${filesId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Imagen obtenida correctamente:", data);
        return data;
      } else {
        throw new Error('fallo al obtener la imagen: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
      throw error;
    }
  };