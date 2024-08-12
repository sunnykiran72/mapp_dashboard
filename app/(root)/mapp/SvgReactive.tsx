"use client"

import React, { useState } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import "./mapStyle.css";


type DataInfo = {
   code : string,
   title:string,
   x: number,
   y:number
}

const SvgReactive = () => {

    const [toolTip, setToolTip] = useState<DataInfo|null>(null);
    const handleMouseEnter = (event: React.MouseEvent<SVGElement>) =>{

      setToolTip({
           code : event.currentTarget.getAttribute('data-name')!,
           title: event.currentTarget.getAttribute('title')!,
           x : event.clientX,
           y: event.clientY
        });
    };

    const handleMouseExit = () => setToolTip(null);
   

  return (
    <section>
      {
        toolTip &&  
          <div
            style={{
              left : toolTip.x+20,
              top : toolTip.y -30,
            }}
            className='space-y-2 w-[130px] h-20 absolute black rounded-md  backdrop-blur-2xl shadow-xl shadow-white/10 bg-orange-900/10 z-30 border-2 border-white/30   px-2 py-1 text-xs'
          >
            <p className='text-slate-700'>Country :</p>
            <p className='text-base font-medium'>{toolTip.title}</p>
            <span className='text-xs text-slate-200'>{toolTip.code}</span>
          </div>
      }
        <SvgLoader path="/testMap.svg" >
            <SvgProxy
              selector="path"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseExit }
              class = "selected-section"
            >
            </SvgProxy>
        </SvgLoader>
    </section>

  )
}

export default SvgReactive