

export const getEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3000/employees", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

