import  { useState, useEffect } from 'react';

function CurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{date.toLocaleDateString()}</span>;
}

export default CurrentDate;
