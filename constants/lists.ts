
type NavBarType = {
    title : string,
    path:string,
    icon : string,
}

export const navbarList :NavBarType[]  = [
    {
        title : "Home",
        path : "/",
        icon : "/icon/home.svg",
    },
    {
        title : "Store",
        path : "/store",
        icon : "/icon/store.svg",
    },
    {
        title : "Mapp",
        path : "/mapp",
        icon : "/icon/map.svg",
    },
    {
        title : "Users",
        path : "/users",
        icon : "/icon/user.svg",
    },
    {
        title : "Settings",
        path : "/settings",
        icon : "/icon/settings.svg",
    },
] as const