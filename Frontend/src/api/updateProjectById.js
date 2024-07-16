export const updateProjectById = async (projectId, formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    console.log("respuesta", response);

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
