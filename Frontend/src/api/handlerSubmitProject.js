
export const handleSubmitProject = async (values) => {
  try {
    const formData = new FormData();
    for (const key in values) {
     
      formData.append(key, values[key]);
    }

    const response = await fetch("http://localhost:3000/projects", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
     
      throw new Error('Failed to submit form data with status: ' + response.status);
    }

    const data = await response.json();
    console.log("Datos del formulario enviados correctamente:", data);
    return data;
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
    throw error; 
  }
};








// export const handleSubmitProject = async (values) => {
//   try {
//     const formData = new FormData();
//     for (const key in values) {
//       if (key === "image" && values[key]) {
//         formData.append(key, values[key]);
//       } else {
//         formData.append(key, values[key]);
//       }
//     }

//     const response = await fetch("http://localhost:3000/projects", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Datos del formulario enviados correctamente:", data);
//       return data;
//     } else {
//       throw new Error('Failed to submit form data with status: ' + response.status);
//     }
//   } catch (error) {
//     console.error("Error al enviar datos del formulario", error);
//   }
// };







// export const handleSubmitProject = async (values, file) => {
//   try {
//     const formData = new FormData();
//     for (const key in values) {
//       formData.append(key, values[key]);
//     }
//     if (file) {
//       formData.append('image', file);
//     }

//     const response = await fetch("http://localhost:3000/projects", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Datos del formulario enviados correctamente:", data);
//       return data;
//     } else {
//       throw new Error('Failed to submit form data with status: ' + response.status);
//     }
//   } catch (error) {
//     console.error("Error al enviar datos del formulario", error);
//   }
// };



// export const handleSubmitProject = async (values) => {    
//   console.log('se ejecuta el submit add new project');
  
//     try {
//       const response = await fetch("http://localhost:3000/projects", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Datos del formulario enviados correctamente:", data);
//         return data;
//       } else {
//         throw new Error('Failed to submit form data with status: ' + response.status);
//       }
//     } catch (error) {
//       console.error("Error al enviar datos del formulario", error);
//     }
//   };