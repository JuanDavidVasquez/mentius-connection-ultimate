import { lazy, LazyExoticComponent } from "react";
import { Login } from "../login/pages/Login";

type JSXComponent = () => JSX.Element;

interface Route {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
}

const Home = lazy(() => import("../home/pages/Home"));

export const routesLogin: Route[] = [
    {
        to: "/",
        path: "/",
        Component: Login,
        name: "Login",
    }
];

export const routesHome: Route[] = [
    {
        path: "/home",
        to: "/home",      
        Component: Home,
        name: "Home",
    },
    {
        path: "/users",
        to: "/users",
        Component: lazy(() => import("../users/page/Users")),
        name: "users",
    },
    {
        path: "/colaboradores",
        to: "/colaboradores",
        Component: lazy(() => import("../colaboradores/pages/Colaboradores")),
        name: "Colaboradores",
    }

];