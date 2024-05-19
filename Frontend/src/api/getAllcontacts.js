export const getAllContacts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/allContacts`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Contactos cargados correctamente:", data);
        return data;
      } else {
        throw new Error('Fallo en cargar los contactos: ' + response.status);
      }
    } catch (error) {
      console.error("Error al obtener tus contactos:", error);
      throw error;
    }
  };