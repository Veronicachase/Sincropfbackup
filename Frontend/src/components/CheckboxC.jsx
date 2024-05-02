/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


export default function CheckboxC({setFieldValue, values}){

    const secciones = [
        { label: "Salón", value: "salon", name:"livingRoom" },
        { label: "Cocina", value: "cocina", name:"kitchen" },
        { label: "Pasillo", value: "pasillo", name:"hall" },
        { label: "Habitación 1", value: "habitacion1", name:"room1" },
        { label: "Habitación 2", value: "habitacion2" , name:"room2" },
        { label: "Baño", value: "bathRoom", name:"bathRoom" },
        { label: "Terraza", value: "terraza", name:"terrace" },
        { label: "Lavandería", value: "lavanderia",name:"laundry" },
        { label: "Piscina", value: "piscina",name:"pool" }
        
      ];
     
     
      const handleChange = (name) =>(event)=> {
        setFieldValue(name,event.target.checked)
          
      };
    
      return (
        <FormGroup>
          {secciones.map((seccion) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={values[seccion.name]}
                  onChange={handleChange(seccion.name)}
                  value={seccion.value}
                />
              }
              label={seccion.label}
              key={seccion.value}
            />
          ))}
        </FormGroup>
      );


}