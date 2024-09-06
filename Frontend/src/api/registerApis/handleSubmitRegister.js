import toast from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitRegister = async (userData, actions, navigate) => {
  try {

    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(userData),
    });
    
    if (response.ok) {
      toast.success('Te has registrado correctamente, inicia sesión para entrar!');
      navigate("/login");
    } else {
      const data = await response.json();
      if (response.status === 409) {
    
        actions.setFieldError("email", "Este email ya está registrado. Usa otro o inicia sesión.");
      } else {
        console.error("Error en el registro", data);
        actions.setFieldError("general", data.message || "Error en el registro");
      }
    }
    actions.setSubmitting(false);
    actions.resetForm();
  } catch (error) {
    console.error("Error de conexión:", error);
    actions.setFieldError("general", "No se puede conectar al servidor");
    actions.setSubmitting(false);
  }
};
