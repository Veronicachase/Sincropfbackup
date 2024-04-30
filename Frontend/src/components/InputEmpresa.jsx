import { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import {TextField} from  '@mui/material';
import MyButton from "./MyButton";


export default function InputEmpresa(){
    
const[empresa, setEmpresa]=useState(['Urbania']);
const [nuevaEmpresa, setNuevaEmpresa]=useState('');
const [empresaSeleccionada, setEmpresaSeleccionada]=useState('')


const agregarEmpresa =()=>{
  if(empresa !== nuevaEmpresa){
    setEmpresa([...empresa, nuevaEmpresa]);
    setNuevaEmpresa('')
  }

}

return(
<>  
<select name='empresa' value={empresaSeleccionada} onChange={(e) => setEmpresaSeleccionada(e.target.value)}>
<option value={''}>Empresa/Contratista</option>
{empresa.map((empresa, index)=>{
<option key={index} value={empresa}>{empresa}</option>

})}
</select>
<TextField label = 'Agrega una empresa' value={nuevaEmpresa} onChange={(e)=>setNuevaEmpresa(e.target.value)} >

</TextField>

<MyButton onClick={agregarEmpresa} ><AddCircle/> </MyButton>



</> 
)
}