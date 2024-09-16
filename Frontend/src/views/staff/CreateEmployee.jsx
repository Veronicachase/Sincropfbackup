import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { CrearTrabajadorFormSchema } from "./EmployeeInitialValuesAndSchema/CrearTrabajadorFormSchema";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { initialValues } from "./EmployeeInitialValuesAndSchema/InitialValues";
import { handleSubmitEmployee } from "../../api/employeeApis/handleSubmitEmployee";
import VoiceInput from "../../components/generalComponents/VoiceInput";
import toast from 'react-hot-toast'
import "bootstrap/dist/css/bootstrap.min.css";

const CrearTrabajador = () => {
  const [selected, setSelected] = useState("");
  const [projects, setProjects] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects();

        if (Array.isArray(projectsData) && projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          
          setProjects([]);
          console.log(
            "No hay proyectos creados. No se puede asignar un proyecto predeterminado."
          );
        }
      } catch (error) {
        console.error(
          "Error al obtener los proyectos. Usando proyecto predeterminado."
        );
        setProjects([{ projectId: "default", projectName: "Default Project" }]); 
      }
    };

    fetchData();
  }, []);

  const handleClick = (value) => {
    setSelected(value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CrearTrabajadorFormSchema}
      onSubmit={async (values, actions) => {
        try {
          await handleSubmitEmployee(values);
          actions.setSubmitting(false);
          toast.success('Trabajador creado correctamente')
          actions.resetForm();
        } catch (error) {
          console.error("Error al enviar datos del formulario:", error);
          toast.error('No se ha podido crear el trabajador')
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="container  mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="shadow p-4">
                  <h4 className="text-center mb-4">Crear Trabajador</h4>

                  {/* Fecha */}
                  <div className="mb-3 text-start">
                    <label htmlFor="date" className="form-label ms-2">
                      Fecha
                    </label>
                    <Field type="date" name="date" className="form-control" />
                  </div>

                  {/* Nombre */}
                  <div className="mb-3 text-start">
                    <label htmlFor="name" className="form-label ms-2">
                      Nombre
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nombre del trabajador"
                    />
                  </div>

                  {/* Posición */}
                  <div className="mb-3 text-start">
                    <label htmlFor="position" className="form-label ms-2">
                      Posición
                    </label>
                    <Field as="select" name="position" className="form-select">
                      <option value="">Seleccione una posición</option>
                      <option value="Encargado">Encargado</option>
                      <option value="Ayudante">Ayudante</option>
                      <option value="Principal">Principal</option>
                      <option value="Becario">Becario</option>
                      <option value="Otro">Otro</option>
                    </Field>
                  </div>

                  {/* Proyecto */}
                  <div className="mb-3 text-start">
                    <label htmlFor="project" className="form-label ms-2">
                      Obra
                    </label>
                    <Field as="select" name="project" className="form-select">
                      <option value="">Seleccione un proyecto</option>
                      {projects?.map((project) => (
                        <option
                          key={project.projectId}
                          value={project.projectId}
                        >
                          {project.projectName}
                        </option>
                      ))}
                    </Field>
                  </div>

                  {/* Equipo Reglamentario Entregado */}
                  <div className="text-center">
                    <h6 className="mb-3 mt-3 text-start">
                      Equipo Reglamentario Entregado
                    </h6>
                    <div className="d-flex justify-content-start gap-2 ">
                      <button
                        type="button"
                        className={`btn ${
                          selected === "Si"
                            ? "btn-success"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleClick("Si")}
                      >
                        SI
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          selected === "No"
                            ? "btn-danger"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleClick("No")}
                      >
                        NO
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          selected === "Incompleto"
                            ? "btn-warning"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleClick("Incompleto")}
                      >
                        Incompleto
                      </button>
                    </div>
                  </div>

                  {/* Comentarios */}
                  <div className="mb-3 text-start mt-4">
                    <label htmlFor="comments" className="form-label ms-2">
                      Comentarios
                    </label>
                    <div className="input-group">
                      <Field
                        as="textarea"
                        name="comments"
                        className="form-control"
                        placeholder="Comentarios sobre el trabajador"
                        rows={3}
                      />
                      <span className="input-group-text">
                        <VoiceInput name="comments" />
                      </span>
                    </div>
                  </div>

                  {/* Botón para enviar */}
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Agregando..." : "Agregar Trabajador"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CrearTrabajador;
