export const updateEmployeeById = async (employeeId, employeeData) => {
 
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         
        },
       
        body:JSON.stringify(employeeData)
      });
  
      if (!response.ok) {
        throw new Error('No se han podido actualizar empleado'); 
      }
  
      
      console.log("Cambios hechos");
    } catch (error) {
      console.error('Error al hacer los cambios empleados:', error);
     
    }
  };