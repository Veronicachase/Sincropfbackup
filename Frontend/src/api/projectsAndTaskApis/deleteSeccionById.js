const apiUrl = import.meta.env.VITE_API_URL;

const deleteSectionById = async (projectId, sectionKey) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${apiUrl}/projects/${projectId}/sections/${sectionKey}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo eliminar la sección");
    }
  } catch (error) {
    console.error("Error al eliminar la sección:", error);
  }
};

export default deleteSectionById;
