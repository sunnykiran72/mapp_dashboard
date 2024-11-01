
// // const downloadSVG = () => {
// //     try {
// //         if (containerRef.current) {
// //             // Find the actual SVG element within the container
// //             const svgElement = containerRef.current.querySelector('svg');
// //             if (svgElement) {
// //                 // Clone the SVG element to avoid modifying the original
// //                 const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
                
// //                 // Ensure the SVG has the correct namespace
// //                 clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                
// //                 // Convert the SVG to a string
// //                 const svgData = new XMLSerializer().serializeToString(clonedSvg);
                
// //                 // Create a Blob and download
// //                 const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
// //                 const link = document.createElement('a');
// //                 link.href = URL.createObjectURL(blob);
// //                 link.download = 'modified-image.svg';
// //                 link.click();
// //             } else {
// //                 console.error('SVG element not found');
// //             }
// //         }
// //     } catch (e) {
// //         console.error('Error downloading SVG:', e);
// //     }
// // };

//     // const svgUrl = "https://raw.githubusercontent.com/flekschas/simple-world-map/master/world-map.svg"; // '/map.svg';


//     "use client"

//     import { useMapStore } from '@/stores/useMapStore';
//     import React, { useEffect, useRef, useState } from 'react'
//     import { SvgLoader, SvgProxy } from 'react-svgmt';
    
//     type OverlayInfo = {
//         id: string
//         title: string,
//         logo?: string,
//         category: string,
//         x: number,
//         y: number
//     }
    
//     const ReactSvgTester: React.FC = () => {
//       const containerRef = useRef<HTMLDivElement>(null);
//       const { updateMapLocation } = useMapStore();
//       const [svgLoaded, setSvgLoaded] = useState(false);
//       const [overlays, setOverlays] = useState<OverlayInfo[]>([]);
//       const [svgViewBox, setSvgViewBox] = useState({ width: 0, height: 0 });
    
//       const svgUrl = "/modified-image (12).svg";
    
//       const processPaths = () => {
//         const svg = containerRef.current?.querySelector('svg');
//         if (!svg) return;
    
//         const viewBox = svg.viewBox.baseVal;
//         setSvgViewBox({ width: viewBox.width, height: viewBox.height });
    
//         const paths = svg.querySelectorAll('path[id][title]');
//         const newOverlays: OverlayInfo[] = Array.from(paths).map((path) => {
//           const svgPath = path as SVGPathElement;
//           const pathLength = svgPath.getTotalLength();
//           const middlePoint = svgPath.getPointAtLength(pathLength / 2);
    
//           return {
//             id: path.getAttribute('id') || "",
//             title: path.getAttribute('title') || "",
//             logo: path.getAttribute('logo') || undefined,
//             category: path.getAttribute('category') || "",
//             x: middlePoint.x,
//             y: middlePoint.y
//           };
//         });
    
//         setOverlays(newOverlays);
//       };
    
//       useEffect(() => {
//         if (svgLoaded) {
//           processPaths();
//         }
//       }, [svgLoaded]);
    
//       const handlePathClick = (event: React.MouseEvent<SVGElement>) => {
//         const path = event.currentTarget as SVGPathElement;
//         const pathId = path.getAttribute('id');
//         const overlay = overlays.find(o => o.id === pathId);
//         if (overlay) {
//         //   updateMapLocation({ location: overlay });
//         }
//       };
    
//       return (
//         <div 
//           ref={containerRef}
//           className='relative w-full h-full'
//         >          
//           <SvgLoader 
//             path={svgUrl} 
//             onSVGReady={() => setSvgLoaded(true)}
//           >
//             <SvgProxy 
//               selector="path" 
//               onClick={handlePathClick}
//               stroke="#e3c1c1"
//               strokeWidth="0.2"
//             />
//           </SvgLoader>
//           {overlays.map((overlay) => (
//             <div
//               key={overlay.id}
//               style={{
//                 position: 'absolute',
//                 left: `${(overlay.x / svgViewBox.width) * 100}%`,
//                 top: `${(overlay.y / svgViewBox.height) * 100}%`,
//                 transform: 'translate(-50%, -50%)'
//               }}
//               className="text-xs bg-red-600 w-5 h-5 text-center flex items-center justify-center rounded-full"
//             >
//               <span>{overlay.id}</span>
//             </div>
//           ))}
//         </div>
//       );
//     };
    
//     export default ReactSvgTester;
    
//     {/* <path class="mainland" d="M" stroke="#e3c1c1" strokewidth="0.2" fill="rgb(227, 218, 232)" id="123" category="Food" title="foody" logo="https://images.pexels.com/photos/27947532/pexels-photo-27947532/free-photo-of-woman-with-food-on-a-picnic.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600&amp;lazy=load" strokeWidth="0.2"></path> */}