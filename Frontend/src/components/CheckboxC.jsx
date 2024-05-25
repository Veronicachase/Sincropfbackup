import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllSections } from '../api/getAllSections';

export default function CheckboxC({ setFieldValue, values }) {
  const [secciones, setSecciones] = useState([])

  useEffect(() => {
    getAllSections().then((secciones) => setSecciones(secciones.sections))
  }, [values])
  //TODO: Hacer que no se traiga todo el rato

  const handleChange = (name) => (event) => {
    const newSections = { ...values.sections, [name]: event.target.checked };
    
    setFieldValue('sections', newSections);
  };

  return (
    <FormGroup>
      <Grid container spacing={2}>
        {secciones.map((seccion) => (
          <Grid item xs={6} key={seccion.name}>
            <Box sx={{ backgroundColor: "#edf5f4", borderRadius: "10px", padding: "8px", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.sections[seccion.name] || false}
                    onChange={handleChange(seccion.name)}
                  />
                }
                label={seccion.label}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}
CheckboxC.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    sections: PropTypes.object.isRequired,
  }).isRequired,
};