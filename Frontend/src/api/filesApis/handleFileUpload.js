const apiUrl = import.meta.env.VITE_API_URL;
export const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file.size > 10000000) {
    console.log("El archivo que intentas subir es demasiado grande, max 10 mb");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(`${apiUrl}/projects/files`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
  } catch (error) {
    console.error("Error al subir el archivo", error);
  }
};
