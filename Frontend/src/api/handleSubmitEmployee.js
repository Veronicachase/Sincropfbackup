export const handleSubmitEmployee = async (values) => {
    const formData = { ...values };
    delete formData.files;
  
    
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
         
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del formulario de empleado enviados correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to submit form data with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al enviar datos del formulario de empleado", error);
    }
  };