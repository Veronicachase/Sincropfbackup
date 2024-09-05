const apiUrl = import.meta.env.VITE_API_URL;
const updateSection = async (projectId, sectionKey, sectionData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${apiUrl}/projects/${projectId}/sections/${sectionKey}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionData),
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo actualizar la sección");
    }
  } catch (error) {
    console.error("Error al actualizar la sección:", error);
  }
};

export default updateSection;
