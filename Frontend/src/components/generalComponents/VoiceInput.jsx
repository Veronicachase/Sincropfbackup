/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import { InputAdornment } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const [listening, setListening] = useState(false);
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'es-ES';

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    setFieldValue(name, transcript);
  };

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setListening(!listening);
  };

  return (
    <InputAdornment position="end">
      <IconButton onClick={toggleListening} color="primary">
        {listening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </InputAdornment>
  );
};


export default VoiceInput;
