import { Link } from "react-router-dom";
import { MenuOptionsList } from "../../components/generalComponents/MenuOptionsList";
import { useAuthContext } from "../../context/AuthContext";
import "../../assets/styles/estilosGenerales.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'

export default function HomeOptions() {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-wrapper ">
    <div>
    <h2 className="mb-5">¿Qué quieres hacer hoy? </h2>
    </div>
      <div className="grid-container">
        {MenuOptionsList.map((option, index) => (
          <div className="grid-item" key={index}>
            <div className="card shadow-sm text-center" style={{ cursor: "pointer" }} onClick={option.name === "Salir" ? handleLogout : null}>
              <Link to={option.name === "Salir" ? "#" : option.path} className="text-decoration-none text-dark">
                <div className="card-body">
                  {option.icon}
                  <h5 className="mt-3">{option.name}</h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
