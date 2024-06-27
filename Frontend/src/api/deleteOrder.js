export const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
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
     
    }
  };
  