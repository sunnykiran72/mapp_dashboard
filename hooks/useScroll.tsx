import { useState , useEffect, useCallback } from "react";


const useScroll = ({threshold}: {threshold:number} ) => {

const [scrolled, setScrolled] = useState(false);

    const onScroll = useCallback(() => {
       setScrolled(window.scrollY > threshold);
    } ,[setScrolled]);
    
    useEffect(() => {
       onScroll(); 
    }, [onScroll]);

    useEffect(() => {
       window.addEventListener("scroll" , onScroll);
       return () => window.removeEventListener("scroll" , onScroll);
    }, [onScroll]);
    
    return scrolled;
}

export default useScroll;