
import  { useEffect, useState, useCallback } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
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

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId); 
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleShareReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const shareLink = report.url;
      navigator.clipboard.writeText(shareLink).then(() => {
        alert('Link copiado al portapapeles');
      }, (err) => {
        console.error('Error copying link: ', err);
      });
    }
  };

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <> 
    <Typography variant='h5' sx={{marginTop:"2em"}}> Lista de Reportes creados en PDF</Typography>
    <List>
      {reports.map((report) => (
        <ListItem key={report.id}>
          <ListItemText primary={
            <a href={report.url} target="_blank" rel="noopener noreferrer">
            {report.original_filename}
            </a>
          } />
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteReport(report.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="share" onClick={() => handleShareReport(report.id)}>
            <ShareIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    </>
  );
};

export default ReportList;
