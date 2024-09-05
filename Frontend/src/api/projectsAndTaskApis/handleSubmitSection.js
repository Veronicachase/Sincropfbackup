const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitSection = async (projectId, newSection) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/projects/${projectId}/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ section: newSection }),
    });

    if (!response.ok) {
      throw new Error("No se pudo agregar la nueva sección");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error al agregar la sección:", error);
  }
};
