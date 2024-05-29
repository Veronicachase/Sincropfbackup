export const addHours = async (employeeId, orderData) => {
  try {
    const response = await fetch(`http://localhost:3000/hours/${employeeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar las horas");
    }

    console.log("Cambios hechos");
  } catch (error) {
    console.error("Error al hacer los cambios en horas:", error);

  }
};
