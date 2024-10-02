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
        path: "/personal-data",
        to: "/personal-data",
        Component: lazy(() => import("../colaboradores/pages/Colaboradores")),
        name: "Personal Data",
    },
    {
        path: "/roles",
        to: "/roles",
        Component: lazy(() => import("../roles/pages/Roles")),
        name: "Roles",
    },
    {
        path: "/asistencia",
        to: "/asistencia",
        Component: lazy(() => import("../asistencia/pages/Asistencia")),
        name: "Asistencia",
    }

];