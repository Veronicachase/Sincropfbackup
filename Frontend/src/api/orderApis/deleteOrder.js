
const apiUrl = import.meta.env.VITE_API_URL;
export const deleteOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar el pedido");
    }

    setOrderData((prevTasks) =>
      prevTasks.filter((task) => task.taskid !== orderId)
    );
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
  }
};
