const apiUrl = import.meta.env.VITE_API_URL;


const addFilesToDb = async (image) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/files`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autorización en el encabezado
      },
        body: JSON.stringify({ imageUrl: image }) 
      });
  
      if (!response.ok) {
        throw new Error('No se pudo agregar la imagen');
      }
  
      console.log("Imagen agregada con éxito");
    } catch (error) {
      console.error('Error al agregar la imagen:', error);
   
    }
  };
  
  export default addFilesToDb;
  
  
