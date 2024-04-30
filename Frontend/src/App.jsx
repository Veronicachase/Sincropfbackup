
import { Routes, Route } from "react-router-dom";
import RequireAuth from './components/RequireAurth'
import  AuthContextProvider  from './context/AuthContext';
import { CreatePdfContextProvider } from "./context/CreatePdfContext";
import InicioProyecto from "./views/proyectos/InicioProyecto";
import ProyectoNuevo from './views/proyectos/ProyectoNuevo'
import MisProyectos from './views/proyectos/MisProyectos'
import Proyecto from './views/proyectos/Proyecto'
import Pendientes from './views/pendientes/Pendientes'
import Avances from './views/avances/avances'
import MaterialYPedidos from './views/matYPedidos/materialYPedidos'
import Contactos from './views/contactos/Contactos'
import InicioPersonal  from './views/personal/InicioPersonal'
import CrearTrabajador from './views/personal/CrearTrabajador'
import ListaTrabajadores from './views/personal/ListaTrabajadores'
import Trabajador from './views/personal/Trabajador'
import Reportes from './views/reportes/Reportes'
import Layout from './components/Layout'
import LoginForm  from './views/login/LoginForm'
import Register from './views/register/Register'
import Home from './views/home/Home'
import ForgotPassword from './views/forgotPassword/ForgotPassword'

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
              <Route path="/inicio-proyecto" element={<InicioProyecto />} />
              <Route path="/proyecto-nuevo" element={<ProyectoNuevo />} />
              <Route path="/mis-proyectos" element={<MisProyectos />} />
              <Route path="/proyecto" element={<Proyecto />} />
              <Route path="/pendientes" element={<Pendientes />} />
              <Route path="/avances" element={<Avances />} />
              <Route path="/material" element={<MaterialYPedidos />} />
              <Route path="/contactos" element={<Contactos />} />
              <Route path="/inicio-personal" element={<InicioPersonal />} />
              <Route path="/crear-trabajador" element={<CrearTrabajador />} />
              <Route  element = <CreatePdfContextProvider/>>  
              <Route path="/lista-trabajadores" element={<ListaTrabajadores />} />
              <Route path="/trabajador" element={<Trabajador />} />
              </Route>
              <Route path="/reportes" element={<Reportes />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}






{/*


  {/*const [theme, setTheme] = useState('light');  

const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));}

  return (
    <>
   
      /*<Button onClick={toggleTheme}>Toggle Theme</Button>*/}