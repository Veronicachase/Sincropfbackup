const apiUrl = import.meta.env.VITE_API_URL;

export const updateEmployeeById = async (employeeId, employeeData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/employees/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar empleado");
    }
  } catch (error) {
    console.error("Error al hacer los cambios empleados:", error);
  }
};
