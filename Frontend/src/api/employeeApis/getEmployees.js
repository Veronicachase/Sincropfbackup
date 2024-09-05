const apiUrl = import.meta.env.VITE_API_URL;
export const getEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
