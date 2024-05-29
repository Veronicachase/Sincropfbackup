import toast, { Toaster } from 'react-hot-toast';

export const deletePending = async (pendingId) => {
  try {
    const response = await fetch(`http://localhost:3000/pendings/${pendingId}`, { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
   
    if (!response.ok) {
      throw new Error('No se pudo eliminar el pedido');
    }
    toast.success('Successfully toasted!')
  } catch (error) {
    console.error('Error al eliminar la tarea, intente de nuevo deletePending:', error);
    
  }
};

  