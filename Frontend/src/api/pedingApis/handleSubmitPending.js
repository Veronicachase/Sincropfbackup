const apiUrl = import.meta.env.VITE_API_URL;
export const addPending = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/pendings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(
        "Failed to submit form data with status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error al enviar datos del formulario", error);
  }
};
