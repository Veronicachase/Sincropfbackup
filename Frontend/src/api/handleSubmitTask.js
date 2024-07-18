export const handleSubmitTask = async (formData, sectionKey) => {
  console.log("Valores", formData);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tasks/${sectionKey}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    body: formData,
      
    });
    console.log(formData)

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
