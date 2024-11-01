import { StoreMapType } from "@/types/schema";
import { ReactNode } from "react"
import {create} from "zustand"

type Cordinates = {
    x: number; 
    y: number 
}

type State = {
    selectedMapLocation? : SVGElement ,
    hoverPointer? : Cordinates
    selectedPoint? : Cordinates,
    // locationList : StoreMapType[]
}

type Actions = {
    updateMapLocation : ({location} : {location : SVGElement} ) => void,
    updateHoverPointer : (pointer? : Cordinates ) => void,
}

export const useMapStore = create<State & Actions>((set) =>  ({
    locationList : [],
    updateMapLocation : ({location}) => set((_) => ({ selectedMapLocation : location })) ,
    updateHoverPointer : (pointer) => pointer &&  set((_) => ({hoverPointer : {...pointer} })),
}))