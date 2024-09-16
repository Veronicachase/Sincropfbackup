import moment from "moment";
export const initialValues = {
  hiringCompany: "",
  projectName: "",
  addressDescription: "",
  block: "",
  unit: "",
  zipCode: "",
  province: "",
  typeOfWork: "finishings",
  constructionType: "other",
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  sections: [],
  //createTask: "",
  projectDescription: "",
  status: "noIniciado",
  image: null,
};
