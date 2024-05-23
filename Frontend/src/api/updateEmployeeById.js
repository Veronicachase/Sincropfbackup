export const updateEmployeeById = async (employeeId, employeeData) => {
    try {
      const response = await fetch(`http://localhost:3000/employee/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(employeeData)
      });
  
      if (!response.ok) {
        throw new Error('No se han podido actualizar empleado'); 
      }
  
      
      console.log("Cambios hechos");
    } catch (error) {
      console.error('Error al hacer los cambios empleados:', error);
     
      alert('Error al editar . Por favor, intenta de nuevo.');
    }
  };