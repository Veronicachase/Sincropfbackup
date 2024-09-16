import { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/projectsAndTaskApis/getProjectById";
import { getTaskBySection } from "../../api/projectsAndTaskApis/getTaskBySection";
import { sectionMapping } from "../../components/proyectComponets/SectionMappingIcons";
import CreatePDFButtonPData from "../../components/pdfComponents/CreatePDFButtonData";
import { Button, Row, Col, Container, Image } from 'react-bootstrap';

export default function ProjectinfoData() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((projectData) => {
          setProject(projectData);
          setLoading(false);
          projectData.sections.forEach((section) => {
            getTaskBySection(projectId, section)
              .then((taskData) => {
                setTasks((prevTasks) => ({
                  ...prevTasks,
                  [section]: taskData,
                }));
              })
              .catch((error) => {
                console.error(
                  `Error fetching tasks for section ${section}:`,
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching project data:", error);
          setLoading(false);
        });
    }
  }, [projectId]);

  if (loading) {
    return <p>Cargando proyecto...</p>;
  }

  if (!project) {
    return <p>No se encontró el proyecto</p>;
  }

  const sectionsWithTasks = project.sections.filter(
    (section) => tasks[section] && tasks[section].length > 0
  );

  return (
    <>
      <Button
        className="my-4 mt-5"
        variant="primary"
        onClick={() => navigate(`/project-info/${projectId}`)}
      >
        Volver a Tareas
      </Button>

      <Container className="my-4" style={{ maxWidth: "800px" }}>
        <Row className="mb-3">
          <Col>
            <div className="shadow p-4 border rounded mx-auto text-start" style={{ maxWidth: '800px' }}>
              <h5>Datos del Proyecto</h5>
              <p><strong>Nombre del proyecto: </strong> {project.projectName}</p>
              <p><strong>Empresa contratante: </strong> {project.hiringCompany}</p>
              <p><strong>Fecha de inicio: </strong> {project.startDate}</p>
              <p><strong>Fecha de entrega: </strong> {project.endDate}</p>
              <p><strong>Descripción general del proyecto: </strong> {project.projectDescription}</p>
              {project.image && (
                <Image src={project.image} alt="Project" fluid />
              )}
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div className="shadow p-4 border rounded mx-auto text-start " style={{ maxWidth: '800px' }}>
              <h5>Dirección</h5>
              <div className="d-flex flex-column"> 
              <p><strong>Dirección:</strong> {project.addressDescription}</p>
              <div className="d-flex gap-2">  
              <p><strong>Bloque:</strong> {project.block}</p>
              <p><strong>No.:</strong> {project.unit}</p>
              </div>
              <div className="d-flex gap-2">
              <p><strong>Código Postal:</strong> {project.zipCode}</p>
              <p><strong>Provincia:</strong> {project.province}</p>
              </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {sectionsWithTasks.map((section) => (
          <Row key={section} className="mb-4">
            <Col>
              <h5>{sectionMapping[section]?.icon} {sectionMapping[section]?.name || section}</h5>
              {tasks[section] &&
                tasks[section].map((task) => (
                  <div key={task.taskId} className="mb-3 shadow p-4 border rounded text-start " style={{ transition: "transform 0.2s", cursor: "pointer" }}>
                    <h6>{task.taskName}</h6>
                    <p>{task.taskDescription}</p>
                    <p>Fecha de inicio: {task.startDate}, Fecha de terminación: {task.endDate}</p>

                    <Row>
                      {task.prevImages && task.prevImages.map((image, index) => (
                        <Col key={index} xs={12} sm={6} md={4} className="mb-3 shadow">
                          <Image src={image} alt={`Prev Image ${index + 1}`} fluid />
                        </Col>
                      ))}
                    </Row>

                    <Row>
                      {task.finalImages && task.finalImages.map((image, index) => (
                        <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                          <Image src={image} alt={`Final Image ${index + 1}`} fluid />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
            </Col>
          </Row>
        ))}
      </Container>

      <Container className="text-center mt-5 mb-5">
        <CreatePDFButtonPData
          project={project}
          tasks={tasks}
          fileName={`reporte_Proyecto_${project.projectName}.pdf`}
          projectId={projectId}
        />
      </Container>
    </>
  );
}
