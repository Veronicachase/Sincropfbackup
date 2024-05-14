

 export const getEmployees = async () => {
  try {
    const response = await fetch("http://localhost:3000/employees");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};


