/* eslint-disable react/prop-types */
import { Button, Grid } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});


function UploadImageCamera({ setFieldValue }) {
    return (
      <Grid item xs={12} sm={10}>
        
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*, .pdf"
            id="icon-button-file"
            type="file"
            onChange={(event) => {
              setFieldValue("files", event.target.files);
            }}
          />
          <Button 
            variant="contained" 
            component="span" 
            startIcon={<PhotoCamera />}
            sx={{width:"150px", height:"100px", backgroundColor:"#EDF5F4", display:"flex", margin:"0 auto", color:"black", marginTop:"15px"}}
          >
            Subir
          </Button>
        </label>
      </Grid>
    );
  }
  
  export default UploadImageCamera;