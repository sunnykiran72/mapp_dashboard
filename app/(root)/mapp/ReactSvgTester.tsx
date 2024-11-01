

// TODO : NEED TO LOOK INTO THE PATTERN
// const getSelector = (id: string) => {
//     return `#${id}, #${id} path`;
// };

// const downloadSVG = () => {
//     try {
//         if (containerRef.current) {
//             // Find the actual SVG element within the container
//             const svgElement = containerRef.current.querySelector('svg');
//             if (svgElement) {
//                 // Clone the SVG element to avoid modifying the original
//                 const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
//                 // Ensure the SVG has the correct namespace
//                 clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//                 // Convert the SVG to a string
//                 const svgData = new XMLSerializer().serializeToString(clonedSvg);
                
//                 // Create a Blob and download
//                 const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//                 const link = document.createElement('a');
//                 link.href = URL.createObjectURL(blob);
//                 link.download = 'modified-image.svg';
//                 link.click();
//             } else {
//                 console.error('SVG element not found');
//             }
//         }
//     } catch (e) {
//         console.error('Error downloading SVG:', e);
//     }
// };

"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMapStore } from '@/stores/useMapStore';
import { SvgLoader, SvgProxy ,AttributeMotion  } from 'react-svgmt';
import "./mapStyle.css";
import { StoreMapType } from '@/types/schema';
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Button } from '@/components/ui/button';
import { Expand } from 'lucide-react';
import RotatableComponent from './ReactRotation';
import Moveable from "react-moveable";


const ReactSvgTester = ({svgRef} : {svgRef : React.MutableRefObject<SVGSVGElement | null>} ) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateMapLocation, selectedMapLocation, updateHoverPointer } = useMapStore();
  const [svgLoaded, setSvgLoaded] = useState(false);
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const svgUrl = "/modified-image.svg";

  useEffect(() => {
    if (svgLoaded) {
      console.log("SVG loaded, now processing paths");
      processPaths();
    }
  }, [svgLoaded]);



  const zoomToPath = useCallback((path: SVGElement) => {
    const bbox = (path as SVGGraphicsElement).getBBox();
    const { x, y, width, height } = bbox;

    if (transformComponentRef.current) {
        const { zoomToElement } = transformComponentRef.current;
        zoomToElement(path as unknown as HTMLElement, 1.5, 500);
    }

    
    console.log(`Zoomed to path at (${x}, ${y}) with dimensions ${width}x${height}`);
  }, []);

  const processPaths = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path[title][logo]');
    const locList: StoreMapType[] = [];
    paths.forEach((path) => {
      locList.push({
        category: path.getAttribute('category')!,
        color: path.getAttribute('fill')!,
        cordinates: [parseFloat(path.getAttribute('xCord')!), parseFloat(path.getAttribute('yCord')!)],
        id: path.getAttribute('id')!,
        title: path.getAttribute('title')!,
        logo: path.getAttribute('logo') || undefined,
      });
    });
  };

  const getSVGCoordinates = (event: React.MouseEvent<SVGElement>): { x: number, y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
  
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
  
    // Get the current transformation matrix of the SVG
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
  
    // Transform the point from screen coordinates to SVG coordinates
    const svgPoint = pt.matrixTransform(ctm.inverse());
  
    return { x: svgPoint.x, y: svgPoint.y };
  };

  const onSelectedPathClick = (event: React.MouseEvent<SVGElement>) => {
    const svgCoordinates = getSVGCoordinates(event);
    if (!svgCoordinates) {
      console.error('Unable to calculate SVG coordinates');
      return;
    }
  
    const { x, y } = svgCoordinates;
    console.log('SVG Coordinates:', { x, y });
    updateHoverPointer({ x, y });
    
    const currentPath = event.currentTarget;
    currentPath.classList.add('custom-cursor');
  };

  const handleMouseLeave = () => {
    updateHoverPointer(undefined);
    if (selectedMapLocation) {
      selectedMapLocation.classList.remove('custom-cursor');
    }
  };

  const handleMouseEnter = () => {
    if (selectedMapLocation) {
      selectedMapLocation.classList.add('custom-cursor');
    }
  };

  const [scale, setScale] = useState(1);

  const handleZoomChange = useCallback((ref: ReactZoomPanPinchRef) => {
    console.log({scale : ref.state.scale});
    const newScale = 1 / ref.state.scale;
    setScale(newScale);
  }, []);


  const scaleGElement = (gElement: SVGGElement, scale: number) => {
    const currentTransform = gElement.getAttribute('transform') || '';
    
    // Extract translation values
    const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
    const translateValues = translateMatch ? translateMatch[1].split(',').map(Number) : [0, 0];
    
    // Create new transform string with scaling
    const newTransform = `translate(${translateValues[0]}, ${translateValues[1]}) scale(${scale})`;
    
    // Set the new transform attribute
    gElement.setAttribute('transform', newTransform);
     console.log(":::::: after :::::");
     console.log(gElement);
     console.log(":::::: after :::::");
};

  useEffect(() => {

    const updateElementsScale = () => {
      const elements = document.querySelectorAll('g[id][category]');
      console.log("selected elements : ");
      elements.forEach((el) => {
        console.log(el);
        scaleGElement(el as SVGGElement , Math.min(Math.max(scale, 0.5), 2));
        console.log({"updated value" : scale});
        const bbox = (el as SVGGraphicsElement).getBBox();
      });
    };

    updateElementsScale();

  }, [scale]);

  const [rotation, setRotation] = useState(0); 
  const handlePinch = useCallback((ref: ReactZoomPanPinchRef) => {
    console.log({state : ref.state});
    // const newRotation = ref.state.rotation; // Get the new rotation from the state
    // setRotation(newRotation); // Update the rotation state
  }, []);

  return (
    <div ref={containerRef} className='relative flex-1'>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        ref={transformComponentRef}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.5 }}
        onZoom={handleZoomChange}
        onPinching={handlePinch}
        onPinchingStart={(v) => {
          console.log("::::::::: panning iniated ::::::::::")
          console.log(v)
          console.log("::::::::: panning iniated ::::::::::")
        }}
        pinch={{
          step : 0.5 , 
          disabled: false
        }}

      >
        {({ zoomIn, zoomOut, resetTransform , 

         }) => (
          <div className='space-y-5' >

          <div className='flex items-center justify-center gap-x-5'>
            <Button variant={"secondary"} className='hover:scale-[1.05] active:scale-[0.96] transition-all duration-200'  onClick={() => zoomIn()} >
                +
              </Button>
            <Button variant={"secondary"} className='hover:scale-[1.05] active:scale-[0.96] transition-all duration-200'  onClick={() => zoomOut()} >
                -
              </Button>
            <Button variant={"secondary"} className='hover:scale-[1.05] active:scale-[0.96] transition-all duration-200'  onClick={() => resetTransform()} >
                <Expand className='w-4 h-4' />
              </Button>
          </div>
          <div 
          className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg)",
                }} >
            <TransformComponent wrapperStyle={{  width: '100%'}} >
                <SvgLoader 
                    path={svgUrl} 
                    onSVGReady={(svg: SVGSVGElement) => {
                      setSvgLoaded(true);
                      svgRef.current = svg;
                    }}
                  >
                    <SvgProxy 
                      selector="path" 
                      onClick={({ currentTarget }: React.MouseEvent<SVGElement>) => { 
                        updateMapLocation({ location: currentTarget });
                        zoomToPath(currentTarget);
                      }}
                    />
                    <SvgProxy 
                      selector={`path[d="${selectedMapLocation?.getAttribute('d')}"]`}
                      onClick={onSelectedPathClick}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={handleMouseEnter}
                      class='custom-cursor'
                    />
                  </SvgLoader>
            </TransformComponent>
          </div>
          </div>
        )}
      </TransformWrapper>
      {/* <Moveable
          target={targetRef}
          rotatable={true}
          throttleRotate={0}
          rotationPosition={"top"}
          onRotate={e => {
              e.target.style.transform = e.drag.transform;                   
      }}
      /> */}
    </div>
  );
};

export default ReactSvgTester;