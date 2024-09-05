const apiUrl = import.meta.env.VITE_API_URL;
export const getAllContacts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Fallo en cargar los contactos: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener tus contactos:", error);
    throw error;
  }
};
