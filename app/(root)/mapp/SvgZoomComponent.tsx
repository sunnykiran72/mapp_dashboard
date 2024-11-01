import React, { useState, useRef, useCallback } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface SvgManipulatorProps {
  svgPath: string;
}

const SvgManipulator: React.FC<SvgManipulatorProps> = ({ svgPath }) => {
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
//   const svgRef = useRef<SVGSVGElement | null>(null);

  const handleSvgLoad = useCallback(() => {
    setSvgLoaded(true);
  }, []);

  const zoomToPath = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    const path = event.currentTarget;
    const bbox = path.getBBox();
    const { x, y, width, height } = bbox;

    if (transformComponentRef.current) {
        const { zoomToElement } = transformComponentRef.current;
        zoomToElement(path as unknown as HTMLElement, 1.5, 500);
    }

    path.setAttribute('fill', 'yellow');
    
    console.log(`Zoomed to path at (${x}, ${y}) with dimensions ${width}x${height}`);
  }, []);

  const rotateLeft = useCallback(() => {
    setRotation((prevRotation) => (prevRotation - 15) % 360);
  }, []);

  const rotateRight = useCallback(() => {
    setRotation((prevRotation) => (prevRotation + 15) % 360);
  }, []);

  const resetRotation = useCallback(() => {
    setRotation(0);
  }, []);

  return (
    <div>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        ref={transformComponentRef}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>Zoom In</button>
              <button onClick={() => zoomOut()}>Zoom Out</button>
              <button onClick={() => resetTransform()}>Reset Zoom</button>
              <button onClick={rotateLeft}>Rotate Left</button>
              <button onClick={rotateRight}>Rotate Right</button>
              <button onClick={resetRotation}>Reset Rotation</button>
            </div>
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '500px', // Adjust as needed
              }}
            >
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '100%',
                }}
              >
                <SvgLoader path={svgPath} onSVGReady={handleSvgLoad}>
                  {/* {svgLoaded && (
                    <SvgProxy
                      selector="svg"
                    //   ref={svgRef}
                    />
                  )} */}
                  {svgLoaded && (
                    <SvgProxy
                      selector="path"
                      onClick={zoomToPath}
                      stroke="#e3c1c1"
                      strokeWidth="0.2"
                    />
                  )}
                </SvgLoader>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default SvgManipulator;