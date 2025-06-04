import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface WaveformLinearProps {
  isPlaying: boolean;
  analyser: AnalyserNode;
  colors: (t: number) => string;
}

const FFT_SIZE = 2048;
const COLOR_STEPS = 600;

export const WaveformLinear: React.FC<WaveformLinearProps> = ({ isPlaying, analyser, colors }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!svgRef.current) return;
    if (!isPlaying) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const w = svgRef.current.clientWidth;
    const h = svgRef.current.clientHeight;

    // Scales
    const x = d3
      .scaleLinear()
      .domain([0, FFT_SIZE - 1])
      .range([0, w]);
    const y = d3.scaleLinear().domain([-1, 1]).range([h, 0]);
    const colorScale = d3.scaleSequential(colors).domain([0, COLOR_STEPS / 2 - 1]);
    const mirrorColorScale = d3.scaleSequential(colors).domain([COLOR_STEPS - 1, COLOR_STEPS / 2]);
    const getColor = (num: number) => (num < COLOR_STEPS / 2 ? colorScale(num) : mirrorColorScale(num));

    // Axis (optional, can be hidden if not needed)
    svg.append('g').attr('class', 'y axis').call(d3.axisLeft(y).ticks(5)).attr('color', 'transparent');

    // Path
    const path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke-width', w / 360);

    // Animation
    let colorOffset = 0;
    const dataArray = new Float32Array(FFT_SIZE);
    const line = d3
      .line<number>()
      .x((_, i) => x(i))
      .y((d) => y(d));

    function render() {
      if (!isPlaying) return;
      colorOffset = (colorOffset + 1) % COLOR_STEPS;
      analyser.getFloatTimeDomainData(dataArray);
      path.datum(Array.from(dataArray)).attr('d', line).attr('stroke', getColor(colorOffset));
      frameRef.current = requestAnimationFrame(render);
    }
    render();

    // Cleanup on unmount
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      svg.selectAll('*').remove();
    };
    // eslint-disable-next-line
  }, [isPlaying, analyser, colors]);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        svgRef.current.setAttribute('width', `${svgRef.current.parentElement?.clientWidth ?? 0}`);
        svgRef.current.setAttribute('height', `${svgRef.current.parentElement?.clientHeight ?? 0}`);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <svg ref={svgRef} width='100%' height='100%' aria-label='Audio waveform visualizer' />;
};

export default WaveformLinear;
