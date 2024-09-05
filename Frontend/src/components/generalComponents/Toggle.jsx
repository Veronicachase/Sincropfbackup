import  { useState } from 'react';

function ToggleComponent({ children }) {
  const [isToggled, setIsToggled] = useState(true);
  
  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    
      children(isToggled, toggle)
    
  );
}

export default ToggleComponent;