export type GlanceCardType = {
    title : string,
    icon: string,
    value: string,
    percentage : number
}


export type RouteElement = SVGLineElement | Element ;
export type RoutePoint = {
    x : number
    y : number
    id : string 
    distance : number
    previous? : RoutePoint
    links: RouteLink[]
}

export type RouteLink = {
    to : RoutePoint 
    distance : number
}