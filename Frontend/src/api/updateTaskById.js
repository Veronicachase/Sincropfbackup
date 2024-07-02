export const updateTaskById = async (taskId, taskData) => {
  console.log("Tareas enviadas / pasando por el fetch updateTaskById:", taskData); 
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error('No se han podido actualizar los cambios en update Task');
    }

    console.log("Cambios hechos");
  } catch (error) {
    console.error('Error al hacer los cambios:', error);
    throw error;
  }
};




// Esto con formData para cuando decida cambiarlo
//export const updateTaskById = async (taskId, taskData) => {
//   try {
//     const formData = new FormData();

//     // Esto agrega todos los valores de taskData al formData
//     Object.keys(taskData).forEach(key => {
//       if (Array.isArray(taskData[key])) {
//         taskData[key].forEach(file => {
//           formData.append(key, file);
//         });
//       } else {
//         formData.append(key, taskData[key]);
//       }
//     });

//     const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
//       method: 'PATCH',
//       body: formData
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error('No se han podido actualizar los cambios en update Task');
//     }

//     console.log("Cambios hechos");
//   } catch (error) {
//     console.error('Error al hacer los cambios:', error);
//     //alert('Error al editar. Por favor, intenta de nuevo.');
//   }
// };
