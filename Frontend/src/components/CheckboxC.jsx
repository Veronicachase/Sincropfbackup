/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, FormGroup, Grid, Box } from '@mui/material';


export default function CheckboxC({setFieldValue, values}){

    const secciones = [
        { label: "Salón", value: "livingRoom", name:"livingRoom" },
        { label: "Cocina", value: "kitchen", name:"kitchen" },
        { label: "Pasillo", value: "hall", name:"hall" },
        { label: "Habitación ", value: "room", name:"room" },
        { label: "Baño", value: "bathRoom", name:"bathRoom" },
        { label: "Terraza", value: "terrace", name:"terrace" },
        { label: "Lavandería", value: "laundry",name:"laundry" },
        { label: "Piscina", value: "roof",name:"pool" },
        { label: "Techo", value: "roof",name:"roof" }
        
      ];
     
     
      const handleChange = (name) =>(event)=> {
        setFieldValue(name,event.target.checked)
          
      };
    
      return (
        <FormGroup>
          <Grid container spacing={2}> 
            {secciones.map((seccion) => (
              <Grid item xs={6} key={seccion.value}> 
                <Box sx={{ backgroundColor: "#edf5f4", borderRadius: "20px", padding: "8px", display: 'flex', alignItems: 'center', justifyContent:"center" }}> 
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values[seccion.name]}
                        onChange={handleChange(seccion.name)}
                        value={seccion.value}
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