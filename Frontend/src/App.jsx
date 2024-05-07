
import { Routes, Route } from "react-router-dom";
import RequireAuth from './components/RequireAurth'
import  AuthContextProvider  from './context/AuthContext';
import { CreatePdfContextProvider } from "./context/CreatePdfContext";
import CreateNewProject from './views/projects/CreateNewProject'
import MyProjects from './views/projects/MyProjects'
import ProjectInfo from './views/projects/ProjectInfo'
import Pendings from './views/Pendings/Pendings'
import Progress from './views/progress/Progress'
import MaterialAndOrders from './views/matAndOrders/materialAndOrders'
import Contacts from './views/contacts/Contacts'
import CreateEmployee from './views/staff/CreateEmployee'
import StaffList from './views/staff/StaffList'
import Employee from './views/staff/Employee'
import Reports from './views/reports/Reports'
import Layout from './components/Layout'
import LoginForm  from './views/login/LoginForm'
import Register from './views/register/Register'
import Home from './views/home/Home'
import ProjectSectionTasks from "./views/projects/ProjectSectionTasks"
import ProjectCreateTask from "./views/projects/ProjectCreateTask"
import ForgotPassword from './views/forgotPassword/ForgotPassword'
import ProjectInfoTask from "./views/projects/ProjectInfoTask";

//import BritishFlag from '../../assets/images/BritishFlag.png';

import { Navigate } from "react-router-dom";

{/** cambiar por un slider button */}
import "./App.css";


export default function App() {
  

  return (
    <>
      
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/create-new-project" element={<CreateNewProject />} />
              <Route path="/my-projects" element={<MyProjects />} />
              <Route path="/project-info" element={< ProjectInfo/>} />
              <Route path="/project-section-tasks" element={< ProjectSectionTasks/>} />
              <Route path="/project-create-task" element={< ProjectCreateTask/>} />
              <Route path="/project-info-task" element={< ProjectInfoTask/>} />
              <Route path="/pendings" element={<Pendings />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/material" element={<MaterialAndOrders />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/staff-list" element={<StaffList />} />
              <Route path="/create-employee" element={<CreateEmployee />} />
              <Route  element = <CreatePdfContextProvider/>>  
              <Route path="/employee" element={<Employee/>} />
              </Route>
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}




