import L from "leaflet";

export default function saveLocation(latlng) {
  const { lat, lng } = latlng;

  fetch(
    "https:aquiva-direccion-para-acceder-a-la-base-de-datos-y-guardar-mi-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.error("Error saving location:", error);
    });
}
