export const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file.size > 10000000) {
    alert("El archivo que intentas subir es demasiado grande, max 10 mb");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch("http://localhost:3000/proyectos", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("El archivo ha sido subido correctamente:",data)
  } catch (error){
    console.error("Error al subir el archivo", error);
  }
};
