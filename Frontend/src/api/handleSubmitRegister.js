import toast from 'react-hot-toast';

export const handleSubmitRegister = async (userData, actions, navigate) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success('Te has registrado correctamente, inicia sesión para entrar!');
      navigate("/login");
    } else {
      console.error("Error en el registro", data);
      actions.setFieldError(
        "general",
        data.message || "Error en el registro"
      );
    }
    actions.setSubmitting(false);
    actions.resetForm();
  } catch (error) {
    console.error("Error de conexión:", error);
    actions.setFieldError("general", "No se puede conectar al servidor");
    actions.setSubmitting(false);
  }
};
