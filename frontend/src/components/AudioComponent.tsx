import React from 'react';
import { Button, Flex } from 'antd';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function AudioComponent() {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const uploadAudioFile = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'audio.wav');

    try {
      const response = await fetch('http://your-fastapi-endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const transcriptionResult = await response.json();
        console.log('Transcription Result:', transcriptionResult);
      } else {
        console.error('Failed to transcribe audio.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    // Send the audio file to FastAPI for transcription
    uploadAudioFile(blob);
  };

  return (
    <Flex
      vertical
      style={{ margin: 'auto', width: '25%' }}
      gap="small"
      align="center"
    >
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        showVisualizer={true}
      />
      <br />
      <Button
        type="primary"
        onClick={recorderControls.stopRecording}
        style={{ width: '150px' }}
      >
        Stop recording
      </Button>
      <br />
    </Flex>
  );
}
