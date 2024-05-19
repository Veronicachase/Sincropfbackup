export const deletePending = async (pendingId) => {
    try {
      const response = await fetch(`http:localhost:3000/pendings/${pendingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar el pedido');
      }
  
    
      setPendingData(prevTasks => prevTasks.filter(pending => pending.pendingId !== pendingId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea. Por favor, intenta de nuevo.');
    }
  };
  