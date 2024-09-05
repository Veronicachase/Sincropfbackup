const apiUrl = import.meta.env.VITE_API_URL;
export const updateHours = async (employeeId, orderData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/hours/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar las horas");
    }
  } catch (error) {
    console.error("Error al hacer los cambios en horas:", error);

    //alert('Error al editar . Por favor, intenta de nuevo.');
  }
};
