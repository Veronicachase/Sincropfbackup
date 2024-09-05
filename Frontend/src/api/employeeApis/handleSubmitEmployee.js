const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitEmployee = async (values) => {
  const formData = { ...values };
  delete formData.files;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(formData),
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
    console.error("Error al enviar datos del formulario de empleado", error);
  }
};
