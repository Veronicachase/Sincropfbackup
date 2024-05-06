import  { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import  getEmployees from "../../api/getEmployees";
import CurrentDate from "../../components/CurrentDate";

 function Employee() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const fetchedEmployees = await getEmployees();
                setEmployees(fetchedEmployees);
            } catch (error) {
                console.error("Failed to fetch employees", error);
                setEmployees([]);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <>
            {employees.map((item) => (
                <Box key={item.employeeId}>
                    <Typography variant="h4">{item.name}</Typography>
                    <Typography variant="h5">Información del trabajador</Typography>
                    <Typography><strong>Posición:</strong> {item.position}</Typography>
                    <Typography><strong>Obra:</strong> {item.project}</Typography>
                    <Typography><strong>Equipo entregado:</strong> {item.mandatoryEquipment}</Typography>
                    <Typography><strong>Comentarios:</strong> {item.comments}</Typography>
                    
                    <Typography variant="h4">Horas trabajadas</Typography>
                    <Typography><strong>Fecha:</strong> <CurrentDate /></Typography>
                    <Typography>Introducir horas trabajadas</Typography>
                    <Formik
                        initialValues={{
                            regularHour: 0,
                            regularMinutes: 0,
                            extraHour: 0,
                            extraMinutes: 0
                        }}
                        validationSchema={yup.object({
                            regularHour: yup.number().required(),
                            regularMinutes: yup.number().required(),
                            extraHour: yup.number().required(),
                            extraMinutes: yup.number().required(),
                        })}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field as={TextField} name="regularHour" placeholder="Horas" />
                                <Field as={TextField} name="regularMinutes" placeholder="Minutos" />
                                <Field as={TextField} name="extraHour" placeholder="Horas" />
                                <Field as={TextField} name="extraMinutes" placeholder="Minutos" />
                                <Button type="submit" disabled={isSubmitting}>Agregar horas</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            ))}
        </>
    );
}

export default Employee;