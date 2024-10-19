const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitOrder = async (values, imageFile) => {

  const formData = new FormData();
  
  
  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

 
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/orders`, {
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
        "Failed to submit /order form data with status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error al enviar datos del formulario crear orden", error);
  }
};
