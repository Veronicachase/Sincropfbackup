export const calculateTotalHours = (hoursWorked) => {
    let totalRegularHours = 0;
    let totalRegularMinutes = 0;
    let totalExtraHours = 0;
    let totalExtraMinutes = 0;
  
    hoursWorked.forEach(entry => {
      totalRegularHours += entry.regularHours;
      totalRegularMinutes += entry.regularMinutes || 0;
      totalExtraHours += entry.extraHours || 0;
      totalExtraMinutes += entry.extraMinutes || 0;
    });
  

    totalRegularHours += Math.floor(totalRegularMinutes / 60);
    totalRegularMinutes = totalRegularMinutes % 60;
  
    totalExtraHours += Math.floor(totalExtraMinutes / 60);
    totalExtraMinutes = totalExtraMinutes % 60;
  
    const totalHours = totalRegularHours + totalExtraHours;
    const totalMinutes = totalRegularMinutes + totalExtraMinutes;
  
   
    const totalFinalHours = totalHours + Math.floor(totalMinutes / 60);
    const totalFinalMinutes = totalMinutes % 60;
  
    return {
      totalRegularHours,
      totalRegularMinutes,
      totalExtraHours,
      totalExtraMinutes,
      totalFinalHours,
      totalFinalMinutes,
    };
  };
  