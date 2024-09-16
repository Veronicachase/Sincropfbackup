import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { CreateTaskFormSchema } from "./TasksSchemaAndInitialValues/CreateTaskFormSchema";
import { getTaskById } from "../../api/projectsAndTaskApis/getTaskById";
import { updateTaskById } from "../../api/projectsAndTaskApis/updateTaskById";
import IconColors from "../../components/generalComponents/IconColors";
import { getEmployees } from "../../api/employeeApis/getEmployees";
import { initialValues } from "./TasksSchemaAndInitialValues/InitialValues";
import { capitalizeFirstLetter } from "../../components/generalComponents/CapitalizedFirstLetter";
import toast from "react-hot-toast";
import { Container, Row, Col, Button, Form as BootstrapForm } from "react-bootstrap";

export default function TaskInfoAndEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [editInitialValues, setEditInitialValues] = useState(initialValues());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
        setPrevImages(
          Array.isArray(taskData.prevImages) ? taskData.prevImages : []
        );
        setFinalImages(
          Array.isArray(taskData.finalImages) ? taskData.finalImages : []
        );
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        setEditInitialValues(initialValues(taskData));
      } catch (error) {
        console.error("Error al obtener la tarea o empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  const handleFileUpload = (event, setImages, existingImages = []) => {
    const files = Array.from(event.target.files);
    setImages(existingImages.concat(files));
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();

    // Añadir campos de texto
    Object.keys(values).forEach((key) => {
      if (key !== "prevImages" && key !== "finalImages") {
        formData.append(key, values[key]);
      }
    });
    if (!values.sectionKey) {
      formData.append("sectionKey", task.sectionKey);
    }

    // Añadir archivos
    prevImages.forEach((file) => {
      formData.append("prevImages", file);
    });

    finalImages.forEach((file) => {
      formData.append("finalImages", file);
    });

    try {
      await updateTaskById(taskId, formData);
      toast.success("Datos actualizados!");
    } catch (error) {
      toast.error("Error al editar. Por favor, intenta de nuevo.");
      console.error("Error en el envío del formulario:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <Container className="mt-4">
      <h2>Editar Tarea</h2>
      <h4>{capitalizeFirstLetter(task.sectionKey)}</h4>
      <div className="d-flex align-items-center my-4">
        <IconColors status={task.status} />
        <h5 className="ml-3">{task.taskName}</h5>
      </div>

      <Formik
        initialValues={editInitialValues}
        validationSchema={CreateTaskFormSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form >
            <Row >
              <Col xs={12} >
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Estado de la tarea</BootstrapForm.Label>
                  <Field
                    as="select"
                    name="status"
                    value={values.status || ""}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="noIniciado">No Iniciado</option>
                    <option value="iniciado">Iniciado</option>
                    <option value="terminado">Terminado</option>
                  </Field>
                </BootstrapForm.Group>
              </Col>

              <Col xs={12}>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Trabajador Asignado</BootstrapForm.Label>
                  <Field
                    as="select"
                    name="employeeName"
                    value={values.employeeName || ""}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {employees.map((employee) => (
                      <option key={employee.employeeId} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </Field>
                </BootstrapForm.Group>
              </Col>

              <Col xs={12}>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Descripción de la tarea</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    name="taskDescription"
                    value={values.taskDescription}
                    onChange={handleChange}
                    className="form-control"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col xs={6}>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Fecha de inicio</BootstrapForm.Label>
                  <Field
                    as="input"
                    type="date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </BootstrapForm.Group>
              </Col>
              <Col xs={6}>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Fecha de entrega</BootstrapForm.Label>
                  <Field
                    as="input"
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            {/* Imágenes iniciales */}
            <div className="border p-3 my-4">
              <h5>Imágenes iniciales</h5>
              {prevImages.length > 0 && (
                <div className="d-flex flex-wrap mt-2">
                  {prevImages.map((img, index) => (
                    <img
                      key={index}
                      src={typeof img === "string" ? img : URL.createObjectURL(img)}
                      alt={`prev-${index}`}
                      className="mr-2 mb-2"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                name="prevImages"
                onChange={(e) => handleFileUpload(e, setPrevImages, prevImages)}
                multiple
                className="form-control mt-3"
              />
            </div>

            {/* Imágenes finales */}
            <div className="border p-3 my-4">
              <h5>Imágenes finales</h5>
              {finalImages.length > 0 && (
                <div className="d-flex flex-wrap mt-2">
                  {finalImages.map((img, index) => (
                    <img
                      key={index}
                      src={typeof img === "string" ? img : URL.createObjectURL(img)}
                      alt={`final-${index}`}
                      className="mr-2 mb-2"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                name="finalImages"
                onChange={(e) => handleFileUpload(e, setFinalImages, finalImages)}
                multiple
                className="form-control mt-3"
              />
            </div>

            <div className="text-center">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Guardar Cambios
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
