import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/generalComponents/SideMenu";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { deleteProject } from "../../api/projectsAndTaskApis/deleteProject";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './myProjects.css';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
  
        if (projectsData.length > 0) {
          setProjects(projectsData); 
          setStatus("success");
        } else {
          setStatus("empty");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        setStatus("error");
      }
    };
  
    fetchProjects();
  }, []);

  const handleClickProject = (projectId) => {
    navigate(`/project-info/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres borrar el proyecto? No podrás recuperar los datos."
    );
    if (!confirmed) return;

    try {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Menú lateral en pantallas grandes */}
        <div className="d-none d-md-block col-md-3 bg-light">
          <SideMenu />
        </div>

        {/* Contenedor de proyectos */}
        <div className="col-12 col-md-9 p-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-5 mt-5">
            <h5 className="text-dark">Lista activa</h5>
            <button className="btn btn-primary" onClick={() => navigate(`/create-new-project`)}>
              Agregar Nuevo
            </button>
          </div>

          {status === "loading" && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {status === "empty" && (
            <div className="alert alert-info text-center">
              No hay proyectos creados para este usuario. Favor crear un proyecto.
            </div>
          )}

          {status === "error" && (
            <div className="alert alert-danger text-center">
              {error || "Ha ocurrido un error al cargar los proyectos."}
            </div>
          )}

          {status === "success" && (
            <div className="row">
              {projects
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                .map((project) => (
                  <div key={project.projectId} className="col-12 mb-3">
                    <div className="project-container d-flex justify-content-between align-items-center p-3 border shadow-sm" onClick={() => handleClickProject(project.projectId)} style={{ cursor: "pointer", transition: "all 0.2s" }}>

                      {/* Información del proyecto */}
                      <div className="d-flex gap-3 align-align-items-center ">
                        <h6 className="mb-1">{project.projectName}</h6>
                        <p className="text-muted mb-0">{project.startDate}</p>
                      </div>

                      {/* Botones de acción */}
                      <div className="d-flex gap-3">
                      
                      <button className="btn btn-link text-primary p-1" onClick={(e) => {
                     e.stopPropagation();
                        navigate(`/project-edit-info/${project.projectId}`);
                         }}
                        >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-link text-info p-1" onClick={(e) => {
                   e.stopPropagation();
                     navigate(`/project-info/${project.projectId}`);
                       }}>
                        
                        <FontAwesomeIcon icon={faEye} /> 
                      </button>
                      <button className="btn btn-link text-danger p-1" onClick={(e) => {
                       e.stopPropagation();
                       handleDelete(project.projectId);
                         }}
                        >
                        <FontAwesomeIcon icon={faTrash} /> 
                      </button>
                    
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
