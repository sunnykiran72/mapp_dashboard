"use client"
import { useMapStore } from '@/stores/useMapStore';
import SvgEditor from './components/SvgEditor'
import ReactSvgTester from './ReactSvgTester'
import { useRef } from 'react';

const page = () => {
  const {selectedMapLocation } = useMapStore();
  const svgRef = useRef<SVGSVGElement | null>(null);

  return <section>
            {/* <RotatableComponent> */}
              <section className='p-5 flex items-center justify-center gap-x-7'>
                <ReactSvgTester svgRef={svgRef}/>
                <div className='w-[300px] bg-salte-100 h-full flex items-center justify-center'>
                  {
                    selectedMapLocation 
                    ? <SvgEditor svgRef={svgRef} />
                    : <div>Select any store info to edit</div>
                  }
                </div>
              </section>
            {/* </RotatableComponent> */}
  </section>
}

export default page




