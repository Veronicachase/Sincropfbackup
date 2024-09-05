const apiUrl = import.meta.env.VITE_API_URL;
export const getEmployeeById = async (employeeId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/employees/${employeeId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Failed to get employee with status: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener el employee:", error);
    throw error;
  }
};
