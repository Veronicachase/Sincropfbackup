export const handleSubmitTask = async (values) => {
  const formData = new FormData();
  Object.keys(values).forEach(key => {
    if (key === 'prevImages') {
      Array.from(values[key]).forEach(file => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, values[key]);
    }
  });

  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Datos del formulario enviados correctamente:", data);
      return data;
    } else {
      throw new Error('Failed to submit form data with status: ' + response.status);
    }
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
  }
};
