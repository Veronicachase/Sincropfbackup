import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

export default function CheckboxC(){

    const secciones = [
        { label: "Salón", value: "salon" },
        { label: "Cocina", value: "cocina" },
        { label: "Pasillo", value: "pasillo" },
        { label: "Habitación 1", value: "habitacion1" },
        { label: "Habitación 2", value: "habitacion2" },
        { label: "Baño", value: "bano" },
        { label: "Terraza", value: "terraza" },
        { label: "Lavandería", value: "lavanderia" },
      ];
      
      const [checkedState, setCheckedState] = useState({
        salon: false ,
        cocina:false,
        pasillo: false ,
        habitación1:false ,
        habitación2:false ,
        baño:false,
        terraza:false ,
        lavandería:false ,
    
      }
     
      );
     
      const handleChange = (event) => {
        setCheckedState({
          ...checkedState,
          [event.target.value]: event.target.checked
        });
      };
    
      return (
        <FormGroup>
          {secciones.map((seccion) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedState[seccion.value]}
                  onChange={handleChange}
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