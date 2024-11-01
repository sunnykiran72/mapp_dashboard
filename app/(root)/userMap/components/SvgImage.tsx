import React, { useRef, useEffect } from 'react';

interface SvgZoomComponentProps {
  svgContent: string;
  pathTitle: string;
}

const SvgZoomComponent: React.FC<SvgZoomComponentProps> = ({ svgContent, pathTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && pathTitle) {
      containerRef.current.innerHTML = svgContent;
      const svgElement = containerRef.current.querySelector('svg');
      const path = svgElement?.querySelector(`path[title="${pathTitle}"]`) as SVGPathElement | null;

      if (svgElement && path) {
        const bbox = path.getBBox();
        const viewBox = svgElement.viewBox.baseVal;

        // Calculate zoom level (you can adjust this value)
        const zoom = Math.min(
          viewBox.width / bbox.width,
          viewBox.height / bbox.height
        ) * 0.8;

        // Calculate center point of the path
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;

        // Set new viewBox
        const newViewBox = `${cx - viewBox.width / (2 * zoom)} ${cy - viewBox.height / (2 * zoom)} ${viewBox.width / zoom} ${viewBox.height / zoom}`;
        svgElement.setAttribute('viewBox', newViewBox);

        // Optional: Highlight the selected path
        path.style.fill = 'yellow'; // Or any other visual indication
      }
    }
  }, [svgContent, pathTitle]);

  return <div ref={containerRef} />;
};

export default SvgZoomComponent;