const apiUrl = import.meta.env.VITE_API_URL;
export const getFilesById = async (filesId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/files/${filesId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("fallo al obtener la imagen: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    throw error;
  }
};
