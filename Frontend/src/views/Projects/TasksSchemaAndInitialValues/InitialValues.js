
import moment from 'moment'

export const initialValues = (task = {} ) => ({
  taskName: task?.taskName || "",
  employeeId: task?.employeeId || "",
  employeeName: task?.employeeName || "",
  taskDescription: task?.taskDescription || "",
  projectId: task?.projectId || "",
  sectionKey: task.sectionKey || "",
  startDate: task?.startDate || moment().format("YYYY-MM-DD"),
  endDate: task?.endDate || moment().format("YYYY-MM-DD"),
  status: task?.status || 'noIniciado',
  prevImages: task?.prevImages || [],
  finalImages: task?.finalImages || [],
  
  
});



