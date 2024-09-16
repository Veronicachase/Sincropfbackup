import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues } from "./ProyectsSchemaAndInitialValues/CrearProyectoInitialValues";
import { NewProjectFormSchema } from "./ProyectsSchemaAndInitialValues/NewProjectFormSchema";
import { handleSubmitProject } from "../../api/projectsAndTaskApis/handlerSubmitProject";
import toast, { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateNewProject() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewProjectFormSchema}
      onSubmit={(values, actions) => {
        handleSubmitProject(values)
          .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            toast.success("Proyecto creado correctamente!");
            navigate("/my-projects");
          })
          .catch((error) => {
            console.error("Error en el proceso:", error);
            actions.setSubmitting(false);
            toast.error("Error al crear el proyecto");
          });
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <Form className="w-100" >
          <div className="container-fluid mt-5 " >
            <div className="row justify-content-center">
              <div className="col-md-10 shadow">
                
                  <h4 className="text-center mb-4">Crear Proyecto</h4>

                  {/* Campos del formulario */}
                  <div className="mb-3 text-start">
                    <label htmlFor="projectName" className="form-label ms-2">Nombre del Proyecto</label>
                    <Field
                      type="text"
                      name="projectName"
                      className={`form-control ${touched.projectName && errors.projectName ? "is-invalid" : ""}`}
                      placeholder="Nombre del proyecto"
                      onChange={handleChange}
                      value={values.projectName}
                    />
                    {touched.projectName && errors.projectName && (
                      <div className="invalid-feedback">{errors.projectName}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="hiringCompany" className="form-label ms-2">Empresa Contratante</label>
                    <Field
                      type="text"
                      name="hiringCompany"
                      className={`form-control ${touched.hiringCompany && errors.hiringCompany ? "is-invalid" : ""}`}
                      placeholder="Empresa Contratante"
                      onChange={handleChange}
                      value={values.hiringCompany}
                    />
                    {touched.hiringCompany && errors.hiringCompany && (
                      <div className="invalid-feedback">{errors.hiringCompany}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="block" className="form-label ms-2">Bloque</label>
                    <Field
                      type="text"
                      name="block"
                      className={`form-control ${touched.block && errors.block ? "is-invalid" : ""}`}
                      placeholder="Bloque"
                      onChange={handleChange}
                      value={values.block}
                    />
                    {touched.block && errors.block && (
                      <div className="invalid-feedback">{errors.block}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="unit" className="form-label ms-2">Unidad</label>
                    <Field
                      type="text"
                      name="unit"
                      className={`form-control ${touched.unit && errors.unit ? "is-invalid" : ""}`}
                      placeholder="Unidad"
                      onChange={handleChange}
                      value={values.unit}
                    />
                    {touched.unit && errors.unit && (
                      <div className="invalid-feedback">{errors.unit}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="addressDescription" className="form-label ms-2">Descripción de la Dirección</label>
                    <Field
                      type="text"
                      name="addressDescription"
                      className={`form-control ${touched.addressDescription && errors.addressDescription ? "is-invalid" : ""}`}
                      placeholder="Dirección del proyecto"
                      onChange={handleChange}
                      value={values.addressDescription}
                    />
                    {touched.addressDescription && errors.addressDescription && (
                      <div className="invalid-feedback">{errors.addressDescription}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="zipCode" className="form-label ms-2">Código Postal</label>
                    <Field
                      type="text"
                      name="zipCode"
                      className={`form-control ${touched.zipCode && errors.zipCode ? "is-invalid" : ""}`}
                      placeholder="Código Postal"
                      onChange={handleChange}
                      value={values.zipCode}
                    />
                    {touched.zipCode && errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="province" className="form-label ms-2">Provincia</label>
                    <Field
                      type="text"
                      name="province"
                      className={`form-control ${touched.province && errors.province ? "is-invalid" : ""}`}
                      placeholder="Provincia"
                      onChange={handleChange}
                      value={values.province}
                    />
                    {touched.province && errors.province && (
                      <div className="invalid-feedback">{errors.province}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="typeOfWork" className="form-label ms-2">Tipo de Trabajo</label>
                    <Field
                      as="select"
                      name="typeOfWork"
                      className={`form-select ${touched.typeOfWork && errors.typeOfWork ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={values.typeOfWork}
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="construction">Construcción</option>
                      <option value="finishings">Repasos</option>
                      <option value="installations">Instalación de equipos</option>
                      <option value="solarPanels">Instalación de paneles solares</option>
                      <option value="other">Otra</option>
                    </Field>
                    {touched.typeOfWork && errors.typeOfWork && (
                      <div className="invalid-feedback">{errors.typeOfWork}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="constructionType" className="form-label ms-2">Tipo de Construcción</label>
                    <Field
                      as="select"
                      name="constructionType"
                      className={`form-select ${touched.constructionType && errors.constructionType ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={values.constructionType}
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="chalet">Chalet</option>
                      <option value="apartment">Piso</option>
                      <option value="rural">Rural</option>
                      <option value="other">Otra</option>
                    </Field>
                    {touched.constructionType && errors.constructionType && (
                      <div className="invalid-feedback">{errors.constructionType}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="startDate" className="form-label ms-2">Fecha de Inicio</label>
                    <Field
                      type="date"
                      name="startDate"
                      className={`form-control ${touched.startDate && errors.startDate ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={values.startDate}
                    />
                    {touched.startDate && errors.startDate && (
                      <div className="invalid-feedback">{errors.startDate}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="endDate" className="form-label ms-2">Fecha de Finalización</label>
                    <Field
                      type="date"
                      name="endDate"
                      className={`form-control ${touched.endDate && errors.endDate ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={values.endDate}
                    />
                    {touched.endDate && errors.endDate && (
                      <div className="invalid-feedback">{errors.endDate}</div>
                    )}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="projectDescription" className="form-label ms-2">Descripción del Proyecto</label>
                    <Field
                      as="textarea"
                      name="projectDescription"
                      className={`form-control ${touched.projectDescription && errors.projectDescription ? "is-invalid" : ""}`}
                      placeholder="Descripción del proyecto"
                      onChange={handleChange}
                      value={values.projectDescription}
                    />
                    {touched.projectDescription && errors.projectDescription && (
                      <div className="invalid-feedback">{errors.projectDescription}</div>
                    )}
                  </div>

                  {/* Campo para subir imagen */}
                  <div className="mb-3 text-start">
                    <label className="form-label ms-2">Agregar Imagen</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        console.log("Archivo seleccionado desde la vista createNewProject:", file);
                        if (file) {
                          setFieldValue("image", file);
                        }
                      }}
                    />
                    {values.image && (
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Preview"
                        className="img-fluid mt-3"
                        style={{ maxHeight: "200px" }}
                      />
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="d-flex justify-content-center gap-3 mb-5 mt-5">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/my-projects")}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary "
                      disabled={isSubmitting}
                     
                    >
                      {isSubmitting ? "Creando..." : "Crear Proyecto"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
         
          <Toaster />
        </Form>
      )}
    </Formik>
  );
}

export default CreateNewProject;
