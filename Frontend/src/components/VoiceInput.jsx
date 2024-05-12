/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useField, useFormikContext } from 'formik';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [isListening, setIsListening] = useState(false);
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'es-ES'; 

  const handleVoice = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setFieldValue(field.name, transcript);
      };
    }
  };

  return (
    <div>
      <label>{label}</label>
      <textarea {...field} {...props} />
      <button type="button" onClick={handleVoice}>
        {isListening ? 'Detener' : 'Dictar'}
      </button>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default VoiceInput;
