
export const handleSubmitTask = async (values, sectionKey) => {
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

  console.log('values', values)

  try {
    const response = await fetch(`http://localhost:3000/tasks/${sectionKey}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
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
