const apiUrl = import.meta.env.VITE_API_URL;

export const updateContactById = async (contactId, contactData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("No se han podido actualizar los cambios");
    }
  } catch (error) {
    console.error("Error al hacer los cambios:", error);

    alert("Error al editar. Por favor, intenta de nuevo.");
  }
};
