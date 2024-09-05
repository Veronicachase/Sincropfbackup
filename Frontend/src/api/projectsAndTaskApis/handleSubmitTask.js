const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitTask = async (formData, sectionKey) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tasks/${sectionKey}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(
        "Failed to submit form data with status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
  }
};
