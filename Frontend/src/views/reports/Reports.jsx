
import  { useEffect, useState, useCallback } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllReportsFromProjects  } from '../../api/getAllReportsFromProjects';
import { deleteReport } from '../../api/deleteReport'
import ShareIcon from '@mui/icons-material/Share';



const ReportList = () => {
  const [reports, setReports] = useState([]);
  
  
  const fetchReports = useCallback(async () => {
    try {
      const data = await getAllReportsFromProjects();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }, []);

  const handleDeleteReport = async (projectId, reportId) => {
    try {
      await deleteReport(projectId, reportId); 
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleShareReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const shareLink = report.url;
      const shareData = {
        title: 'Reporte',
        text: 'Mira este reporte',
        url: shareLink
      };

      if (navigator.share) {
        navigator.share(shareData).then(() => {
          console.log('Compartido exitosamente');
        }).catch((error) => {
          console.error('Error al compartir:', error);
        });
      } else {
        const subject = `Mira este reporte: ${report.original_filename}`;
        const body = `Puedes ver el reporte en el siguiente enlace: ${shareLink}`;

        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
      }
    }
  };
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);
 
  const formatFilename = (filename) => {
    // Decodifica la URL y luego remueve números y caracteres especiales, y reemplaza guiones bajos y guiones con espacios
    const decodedFilename = decodeURIComponent(filename);
    return decodedFilename.replace(/^\d+-/, '').replace(/_/g, ' ').replace(/-/g, ' ');
  };

  return (
    <> 
    <Typography variant='h5' sx={{marginTop:"2em"}}> Lista de Reportes creados en PDF</Typography>
    <List>
      {reports.map((report) => (
        <Box key={report.id}
        sx={{boxShadow:"0 0 2px #ccc", borderRadius:"10px"}}> 
        <ListItem key={report.id}>
        <ListItemText primary={
          <a 
            href={report.url} 
            target="_blank" 
            rel="noopener noreferrer"
            download={formatFilename(report.original_filename)}
            >
              {formatFilename(report.original_filename)}
          </a>
          } />
          <IconButton edge="end" aria-label="delete"  onClick={() => handleDeleteReport(report.projectId, report.id)}>
            <DeleteIcon sx={{color:"red", marginRight:".5em"}}/>
          </IconButton>
          <IconButton edge="end" aria-label="share" onClick={() => handleShareReport(report.id)}>
            <ShareIcon />
          </IconButton>
        </ListItem>
        </Box>
      ))}
    </List>
    </>
  );
};

export default ReportList;
