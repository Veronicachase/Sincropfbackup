export const handleSubmitProject = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const response = await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        "Failed to submit form data with status: " + response.status
      );
    }

    const data = await response.json();
    console.log("Datos del formulario enviados correctamente:", data);
    return data;
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
    throw error;
  }
};
