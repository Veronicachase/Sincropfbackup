// aquí tengo que crear mi handleSubmitOrder y conectarla con mi 
//backend 
export const handleSubmitOrder = async (values) => {
    const formData = {...values, status:'pendiente'};
    delete formData.files;
    console.log("Datos que se envían desde el front fetch:", formData);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      
        body:formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del formulario /orden de contacto enviados correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to submit /order form data with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al enviar datos del formulario crear orden", error);
    }
  };