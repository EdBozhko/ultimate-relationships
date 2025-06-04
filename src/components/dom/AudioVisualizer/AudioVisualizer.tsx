import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { interpolateRainbow } from 'd3';
import { WaveformLinear } from './WaveformLinear.tsx';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audio: React.RefObject<HTMLAudioElement>;
}

const AudioVisualizerStyled = styled.div`
  width: 100%;
  height: 30rem;
  position: relative;
  z-index: 1;
  margin: 0 0 auto 0;
`;

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audio }) => {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audio.current) return;

    let context: AudioContext | null = null;
    let analyserNode: AnalyserNode | null = null;
    let gain: GainNode | null = null;
    let src: MediaElementAudioSourceNode | null = null;

    const setupAudioContext = () => {
      context = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserNode = context.createAnalyser();
      analyserNode.fftSize = 2048;
      analyserNode.minDecibels = -105;
      analyserNode.maxDecibels = -25;
      analyserNode.smoothingTimeConstant = 0.8;
      gain = context.createGain();
      src = context.createMediaElementSource(audio.current!);
      src.connect(gain);
      gain.connect(analyserNode);
      analyserNode.connect(context.destination);
      setAnalyser(analyserNode);
      contextRef.current = context;
    };

    // Only create context if audio is playing
    if (isPlaying && !contextRef.current) {
      setupAudioContext();
    }

    return () => {
      // Cleanup
      setAnalyser(null);
      if (contextRef.current) {
        contextRef.current.close();
        contextRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [isPlaying, audio]);

  return (
    <AudioVisualizerStyled>
      {analyser && <WaveformLinear isPlaying={isPlaying} analyser={analyser} colors={interpolateRainbow} />}
    </AudioVisualizerStyled>
  );
};

export default AudioVisualizer;
