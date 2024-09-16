import { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from 'prop-types';

import {
  Button,
  Collapse,
  Modal,
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { deleteTask } from "../../api/projectsAndTaskApis/deleteTask";
import { getTaskBySection } from "../../api/projectsAndTaskApis/getTaskBySection";
import { useNavigate } from "react-router-dom";
import { CreatePDFButton } from "../../components/pdfComponents/CreatePDFButton";
import { getProjectById } from "../../api/projectsAndTaskApis/getProjectById";
import VoiceInputNoFormik from "../generalComponents/VoiceInputNoFormik";
import ExpandableImage from "../../components/imageComponents/ExpandableImage";
import { SectionMappingContext } from "../../context/MappingContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import IconColors from "../generalComponents/IconColors";
import toast from "react-hot-toast";

export const SectionsAndTasks = ({
  projectId,
  sectionKey,
  taskData = [],
  setTaskData,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { sectionMapping } = useContext(SectionMappingContext);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProjectById(projectId);
      setProject(projectData);
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (projectId && sectionKey) {
        try {
          const tasks = await getTaskBySection(projectId, sectionKey);
          if (tasks === null) {
            setError("No hay tareas disponibles para esta sección.");
            setTaskData([]);
          } else {
           
            setTaskData(tasks);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setError("Error al obtener las tareas.");
          setTaskData([]);
        }
      }
    };

    fetchTasks();
  }, [projectId, sectionKey, setTaskData]);

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (!confirmed) return;
    try {
      await deleteTask(taskId);
      setTaskData((prevTasks) =>
        prevTasks.filter((task) => task.taskId !== taskId)
      );
      toast.success("Tarea eliminada exitosamente");
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  const handleToggleExpand = useCallback(
    (taskId) => {
      setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    },
    [expandedTaskId]
  );

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedImage(null);
  }, []);

  const handleAdditionalInfoChange = useCallback((text) => {
    setAdditionalInfo(text);
  }, []);

  return (
    <div className="container-fluid">
      <h5 className="text-left mt-3 mb-3">
        Tareas : {sectionMapping[sectionKey].name || sectionKey}
      </h5>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : taskData.length === 0 ? (
        <p>No hay tareas para esta sección.</p>
      ) : (
        taskData.map((task) => (
          <Card key={task.taskId} className="mb-3 w-100 mw-100 p-2" >
            
              <Row className=" w-100 ">
                <Col xs={10} className="mb-1 ">
                  <div className="d-flex align-items-center ">
                    {task.status && <IconColors status={task.status} />}
                    <h6 className="ms-3 ml-3 mb-0  ">{task.taskName}</h6>
                  </div>
                </Col>
                <Col xs={2} className="d-flex justify-content-end">
                  <Button
                    variant="link"
                    onClick={() => handleToggleExpand(task.taskId)}
                  >
                  {expandedTaskId === task.taskId ? (
                    <i className="bi bi-chevron-up"></i> 
                  ) : (
                    <i className="bi bi-chevron-down"></i> 
                  )}
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => navigate(`/edit-task/${task.taskId}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleDeleteTask(task.taskId)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>

              <Collapse in={expandedTaskId === task.taskId}>
                <div className="mt-3 text-start p-3">
                  <p >
                    <strong>Descripción: </strong>
                    {task.taskDescription}
                  </p>
                  <p>
                    <strong>Trabajador: </strong>
                    {task.employeeName}
                  </p>
                  <p>
                    <strong>Fecha de inicio: </strong>
                    {task.startDate}
                  </p>
                  <p>
                    <strong>Fecha de fin: </strong>
                    {task.endDate}
                  </p>

                  <div className="mt-3">
                    <p>
                      <strong>Imágenes Iniciales:</strong>
                    </p>
                    <div className="d-flex flex-wrap">
                      {Array.isArray(task.prevImages) &&
                        task.prevImages.map((image, index) => (
                          <ExpandableImage
                            src={image}
                            key={index}
                            alt={`Inicial ${index}`}
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p>
                      <strong>Imágenes Finales:</strong>
                    </p>
                    <div className="d-flex flex-wrap">
                      {Array.isArray(task.finalImages) &&
                        task.finalImages.map((image, index) => (
                          <ExpandableImage
                            src={image}
                            key={index}
                            alt={`Final ${index}`}
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <Form.Group>
                      <Form.Label>
                        Escribe aquí información que solo aparecerá en tu pdf:
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Escribe información adicional aquí..."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                      <VoiceInputNoFormik
                        onTextChange={handleAdditionalInfoChange}
                      />
                    </Form.Group>
                  </div>

                  {project && (
                    <CreatePDFButton
                      project={project}
                      tasks={[task]}
                      additionalInfo={additionalInfo}
                      fileName={`reporte_${project.projectName}_${task.taskName}.pdf`}
                    />
                  )}
                </div>
              </Collapse>
            
          </Card>
        ))
      )}

      <Modal show={modalOpen} onHide={handleCloseModal} centered>
        <Modal.Body>
          {selectedImage && (
            <ExpandableImage
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

SectionsAndTasks.propTypes = {
  projectId: PropTypes.string,
  sectionKey: PropTypes.string,
  taskData: PropTypes.array,
  setTaskData: PropTypes.func,
};
