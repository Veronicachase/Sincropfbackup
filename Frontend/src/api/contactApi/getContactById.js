const apiUrl = import.meta.env.VITE_API_URL;

export const getContactById = async (contactId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
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
      throw new Error("Failed to get contact with status: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    throw error;
  }
};
