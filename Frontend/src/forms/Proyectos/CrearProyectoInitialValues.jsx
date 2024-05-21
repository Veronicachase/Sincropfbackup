import moment from 'moment'
export const initialValues = {
  hiringCompany: "",
  projectName: "",
  identifier:"",
  addressDescription: "",
  address: "",
  block: "",
  unit: "",
  zipCode: "",
  province: "",
  map: "lat: 36.579395, lng: -4.597678",
  typeOfWork: "finishings",
  constructionType: "otra",
  startDate: moment().format("YYYY-MM-DD"), 
  endDate: moment().format("YYYY-MM-DD"),  
  sections: {
    livingRoom: false,
    kitchen: false,
    hall: false,
    room: false,
    bathRoom: false,
    terrace: false,
    laundry: false,
    pool: false,
    roof: false
  },
  createTask: "",
  projectDescription: "",
  status: "noIniciado",
  image:""
}
