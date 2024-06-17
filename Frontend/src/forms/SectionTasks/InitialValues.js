
import moment from 'moment'

export const initialValues = (task = {}, projectData) => ({
  taskName: task?.taskName || "",
  employeeId: task?.employeeId || "",
  employeeName: task?.employeeName || "",
  taskDescription: task?.taskDescription || "",
  projectId: task?.projectId || "",
  sectionKey: projectData ? projectData.section : "",
  startDate: task?.startDate || moment().format("YYYY-MM-DD"),
  endDate: task?.endDate || moment().format("YYYY-MM-DD"),
  status: task?.status || 'noIniciado',
  pdf: task?.pdf || [],
  prevImages: task?.prevImages || [],
  finalImages: task?.finalImages || [],
});



