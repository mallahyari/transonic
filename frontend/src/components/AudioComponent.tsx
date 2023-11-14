import React, { useEffect, useState } from 'react';
import { Button, Flex, Typography, Card, Row, Col } from 'antd';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { PlusOutlined } from '@ant-design/icons';
import { TwitterShareButton } from 'react-share';
import { SocialIcon } from 'react-social-icons';

const { Title, Paragraph } = Typography;

export default function AudioComponent() {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const uploadAudioFile = async () => {
    const formData = new FormData();
    if (!recordedBlob) return;
    formData.append('file', recordedBlob, 'audio.wav');
    setIsTranscribing(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const transcriptionResult = await response.json();
        setTranscript(transcriptionResult.transcript);
        console.log('Transcription Result:', transcriptionResult);
      } else {
        console.error('Failed to transcribe audio.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    setRecordedBlob(blob);
  };

  useEffect(() => {
    setRecordedBlob(null);
    setTranscript('');
  }, [recorderControls.isRecording]);

  // Format the time to display as 00/60 sec
  const formatRecordingTime = (time: number) => {
    const remainingTime = Math.max(60 - time, 0);
    const seconds = Math.floor(remainingTime % 60);
    return `${String(seconds).padStart(2, '0')}/60 sec`;
  };

  return (
    <>
      <Flex
        vertical
        style={{ margin: 'auto', width: '25%' }}
        gap="small"
        align="center"
      >
        {recorderControls.isRecording && (
          <Title level={3}>
            {formatRecordingTime(60 - recorderControls.recordingTime)}
          </Title>
        )}
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
        <br />
        {recorderControls.isRecording && (
          <Button
            type="primary"
            danger
            onClick={recorderControls.stopRecording}
            style={{ width: '150px' }}
          >
            Stop recording
          </Button>
        )}
        <br />
        <div>
          {recordedBlob && (
            <Flex vertical gap="middle" align="center">
              <audio className="w-full" controls>
                <source
                  src={URL.createObjectURL(recordedBlob)}
                  type={recordedBlob.type}
                />
              </audio>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={uploadAudioFile}
                loading={isTranscribing}
                style={{ width: '150px' }}
              >
                Create Note
              </Button>
            </Flex>
          )}
        </div>
      </Flex>
      {isTranscribing ? (
        <Row
          gutter={16}
          justify="center"
          style={{
            marginTop: '100px',
            width: '100%',
            textAlign: 'left',
            lineHeight: '1.65rem',
          }}
        >
          <Col span={12}>
            <Card title="Note title" bordered={true} loading={isTranscribing}>
              <Paragraph>{transcript}</Paragraph>
            </Card>
          </Col>
        </Row>
      ) : (
        transcript.length > 0 && (
          <Row
            gutter={16}
            justify="center"
            style={{
              marginTop: '100px',
              width: '100%',
              textAlign: 'left',
              lineHeight: '1.65rem',
            }}
          >
            <Col span={12}>
              <Card
                title="Note title"
                bordered={true}
                hoverable={true}
                actions={[
                  <TwitterShareButton
                    url={transcript}
                    // title="no title"
                    // via="via"
                    // hashtags={['#hihh']}
                    // related={['hi']}
                  >
                    <SocialIcon network="x" />
                  </TwitterShareButton>,
                ]}
              >
                <Paragraph>{transcript} </Paragraph>
              </Card>
            </Col>
          </Row>
        )
      )}
    </>
  );
}
