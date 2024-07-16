export const handleSubmitTask = async (values, sectionKey) => {
  console.log("Valores", values);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tasks/${sectionKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Datos del formulario enviados correctamente:", data);
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
