  export const updateOrder = async (orderId, orderData ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
       
        body:JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('No se han podido actualizar el pedido'); 
      }
  
      
      console.log("Cambios hechos");
    } catch (error) {
      console.error('Error al hacer los cambios en pedidos-orden-materiales:', error);
     
      
    }
  };
  
