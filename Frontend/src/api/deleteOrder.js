const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http:localhost:3000/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar el pedido');
      }
  
    
      setOrderData(prevTasks => prevTasks.filter(task => task.taskid !== orderId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea. Por favor, intenta de nuevo.');
    }
  };
  export default deleteOrder