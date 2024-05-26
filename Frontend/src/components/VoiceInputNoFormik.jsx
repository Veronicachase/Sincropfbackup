import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { InputAdornment } from '@mui/material';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInputNoFormik = ({ onTextChange }) => {
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
    onTextChange(transcript);
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

export default VoiceInputNoFormik;
