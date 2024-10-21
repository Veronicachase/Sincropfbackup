const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitProject = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
  
    for (const key in values) {
     
      if (key !== 'image') {
        formData.append(key, values[key]);
      }
    }

 
    if (values.image) {
      formData.append("image", values.image);
    }

const response = await fetch(`${apiUrl}/projects`, {
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
    console.log("respuesta despues de recibir el respose del fetch", data)
    return data;
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
    throw error;
  }
};
