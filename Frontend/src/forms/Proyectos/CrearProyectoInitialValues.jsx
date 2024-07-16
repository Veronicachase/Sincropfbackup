import moment from 'moment'
export const initialValues = {
  hiringCompany: "",
  projectName: "",
  identifier:"",
  addressDescription: "",
  block: "",
  unit: "",
  zipCode: "",
  province: "",
  map: "lat: 36.579395, lng: -4.597678",
  typeOfWork: "finishings",
  constructionType: "other",
  startDate: moment().format("YYYY-MM-DD"), 
  endDate: moment().format("YYYY-MM-DD"),  
  sections:[],
  //createTask: "",
  projectDescription: "",
  status: "noIniciado",
  image:""
}
