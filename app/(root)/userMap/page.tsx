"use client";

import React from 'react'
import SvgZoomComponent from './components/SvgImage'
// import svgImg from "@/public/testMap.svg";

const svgImg = `<?xml version="1.0" encoding="utf-8"?>
<!-- (c) ammap.com | SVG map of Afghanistan - High -->
<svg ....
</svg>`

const UserMap = () => {
    
  return (
    <div className='w-[400px] h-[400px]'>
    <SvgZoomComponent
      svgContent={svgImg}
      pathTitle='Paktya'
    />
  </div>

  )
}

export default UserMap