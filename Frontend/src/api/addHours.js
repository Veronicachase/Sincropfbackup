export const addHours = async (employeeId, hoursData) => {
  try {
    const response = await fetch(`http://localhost:3000/hours/${employeeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hoursData),
    });

    if (!response.ok) {
      throw new Error('No se han podido actualizar las horas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al hacer los cambios en horas:', error);
    throw error;
  }
};
