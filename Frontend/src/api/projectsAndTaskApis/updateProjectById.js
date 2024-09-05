const apiUrl = import.meta.env.VITE_API_URL;
export const updateProjectById = async (projectId, formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "No se han podido actualizar los cambios."
      );
    }
    const responseData = await response.json();
    return { ok: response.ok, responseData };
  } catch (error) {
    console.error("Error al hacer los cambios:", error);
    throw error;
  }
};
