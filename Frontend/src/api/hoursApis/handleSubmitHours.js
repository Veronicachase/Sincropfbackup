const apiUrl = import.meta.env.VITE_API_URL;
export const handleSubmitHours = async (employeeId, hoursData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/hours/${employeeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hoursData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar las horas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al hacer los cambios en horas:", error);
    throw error;
  }
};
