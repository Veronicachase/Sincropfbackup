// aquí tengo que crear mi handleSubmitContact y conectarla con mi 
//backend el cual también tengo que crear
export const handleSubmitContact = async (values) => {
    const formData = {...values};
    delete formData.files;
  
    try {
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del formulario de contacto enviados correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to submit form data with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al enviar datos del formulario de contacto", error);
    }
  };