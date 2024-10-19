const apiUrl = import.meta.env.VITE_API_URL;

export const deleteContact = async (contactId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el contacto: ' + response.status);
    }

    return { message: "Contacto eliminado exitosamente" };

  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    throw error;
  }
};
