export const getEmployeeById = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
        method: "GET",
        headers: {
        'Authorization': `Bearer ${token}`
      },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Contacto obtenido correctamente:", data);
        return data;
      } else {
        throw new Error('Failed to get employee with status: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener el employee:", error);
      throw error;
    }
  };