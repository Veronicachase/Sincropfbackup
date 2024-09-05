import toast, { Toaster } from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_API_URL;
export const deletePending = async (pendingId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${apiUrl}/pendings/${pendingId}`, { 
      method: 'DELETE',
      headers: {
        
        'Authorization': `Bearer ${token}` 
      },
      
    });
   
    if (!response.ok) {
      throw new Error('No se pudo eliminar el pendiente');
    }
    toast.success('El pendiente ha sido borrado exitosamente!')
  } catch (error) {
    console.error('Error al eliminar la tarea, intente de nuevo deletePending:', error);
    toast.error('El pendiente se ha podido borrar!')
  }
};

  