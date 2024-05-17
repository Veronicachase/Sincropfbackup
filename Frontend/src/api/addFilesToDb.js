const addFilesToDb = async (image) => {
    try {
      const response = await fetch(`http://localhost:3000/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl: image }) 
      });
  
      if (!response.ok) {
        throw new Error('No se pudo agregar la imagen');
      }
  
      console.log("Imagen agregada con éxito");
    } catch (error) {
      console.error('Error al agregar la imagen:', error);
      alert('Error al agregar la imagen. Por favor, intenta de nuevo.');
    }
  };
  
  export default addFilesToDb;
  
  
