import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../components/generalComponents/CustomTextField";
import { handleSubmitOrder } from "../../api/orderApis/handleSubmitOrder";
import { OrderFormSchema } from "./ordersSchemaAndInitialValues/OrdersFormSchema";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import { InitialValues } from "./ordersSchemaAndInitialValues/InitialValues";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateOrder() {
  const navigate = useNavigate();
  const { projectId: currentProjectId } = useParams();
  const [image, setImage] = useState("");
  const [projects, setProjects] = useState(null); 
  const [initialValues, setInitialValues] = useState(InitialValues);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await getAllProjects();

        if (Array.isArray(projectResponse) && projectResponse.length > 0) {
          setProjects(projectResponse);

          const currentProject = projectResponse.find(
            (project) => project.projectId === currentProjectId
          );
          if (currentProject) {
            setInitialValues((prevValues) => ({
              ...prevValues,
              projectId: currentProject.projectId,
              projectName: currentProject.projectName,
            }));
          }
        } 
      } catch (error) {
        console.error(
          "Error al obtener los proyectos: No hay proyectos o permisos denegados"
        );
      
      }
    };

    fetchProjects();
  }, [currentProjectId]);

 

 
  // Si no hay proyectos, mostramos un mensaje y un botón para crear uno
  if (projects && projects.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>No tienes proyectos creados.</h3>
        <p>Necesitas crear un proyecto para poder realizar un pedido.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-project")}
        >
          Crear Proyecto
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <p className="text-lg-start">
          Fecha: {new Date().toISOString().slice(0, 10)}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={OrderFormSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
          

            handleSubmitOrder(values, image)
              .then(() => {
                actions.setSubmitting(false);
                actions.resetForm();
                toast.success("Producto creado correctamente!");
                navigate("/order-list");
              })
              .catch((error) => {
                console.error("Error en el proceso: ", error);
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className=" shadow p-4">
                <h4 className="text-center mb-4">Crear Pedido</h4>

                <div className="mb-3">
                  <label htmlFor="projectId" className="form-label text-start ms-2">
                    ID del Proyecto
                  </label>
                  <Field
                    name="projectId"
                    as={CustomTextField}
                    className="form-control"
                    readOnly
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label text-start ms-2">
                    Nombre del Proyecto
                  </label>
                  <Field
                    name="projectName"
                    as="select"
                    className="form-select"
                    onChange={(event) => {
                      const selectedProject = projects?.find(
                        (project) => project.projectName === event.target.value
                      );
                      setFieldValue("projectName", event.target.value);
                      setFieldValue(
                        "projectId",
                        selectedProject ? selectedProject.projectId : ""
                      );
                    }}
                    value={values.projectName || ""}
                  >
                    <option value="">Seleccionar Proyecto</option>
                    {projects?.map((project) => (
                      <option
                        key={project.projectId}
                        value={project.projectName}
                      >
                        {project.projectName}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="mb-3 text-start ">
                  <label htmlFor="productName" className="form-label ms-2 ">
                    Nombre 
                  </label>
                  <Field
                    name="productName"
                    className="form-control"
                    placeholder="Nombre del Producto"
                  />
                </div>

                <div className="mb-3 text-start ">
                  <label htmlFor="amount" className="form-label ms-2">
                    Cantidad
                  </label>
                  <Field
                    name="amount"
                    className="form-control"
                    placeholder="Cantidad"
                  />
                </div>

                <div className="mb-3 text-start ">
                  <label htmlFor="brand" className="form-label ms-2 ">
                    Marca
                  </label>
                  <Field
                    name="brand"
                    className="form-control"
                    placeholder="Marca del Producto"
                  />
                </div>

                <div className="mb-3 text-start ">
                  <label htmlFor="details" className="form-label ms-2 ">
                    Detalles
                  </label>
                  <Field
                    name="details"
                    className="form-control"
                    placeholder="Detalles del Producto"
                  />
                </div>

                <div className="mb-3 text-start ">
                  <label htmlFor="provider" className="form-label ms-2">
                    Proveedor
                  </label>
                  <Field
                    name="provider"
                    className="form-control"
                    placeholder="Opciones de donde comprarlo"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="fileInput"
                    className="btn btn-outline-primary "
                  >
                    Agregar Imagen
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  {image && (
                    <img
                    src={URL.createObjectURL(image)} 
                      alt="Preview"
                      className="img-fluid mt-3"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                </div>

                <div className="d-grid mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Crear Producto
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CreateOrder;
