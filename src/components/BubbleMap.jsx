import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleMap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 400)
      .attr('height', 300);

    svg.selectAll('*').remove();

    // Mock holder data for bubbles (wallet sizes)
    const holders = [
      { wallet: 'Dev', size: data.devHolding * 10, risk: 'high' },
      { wallet: 'Insider1', size: data.insiderPercentage * 5, risk: 'medium' },
      { wallet: 'Sniper', size: data.sniperPercentage * 2, risk: 'high' },
      // Add more...
    ];

    const simulation = d3.forceSimulation(holders)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(200, 150))
      .force('collision', d3.forceCollide().radius(d => d.size));

    const bubbles = svg.selectAll('circle')
      .data(holders)
      .enter()
      .append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.risk === 'high' ? 'red' : d.risk === 'medium' ? 'orange' : 'green')
      .attr('opacity', 0.7);

    simulation.on('tick', () => {
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Tooltips
    bubbles.append('title').text(d => `${d.wallet}: ${d.size}% holdings`);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default BubbleMap;
