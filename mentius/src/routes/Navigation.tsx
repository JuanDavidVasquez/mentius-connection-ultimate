import { Suspense, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { routesHome, routesLogin } from "./routes";
import logo from '../assets/logoBlanco.png'

export const Navigation = () => {
  const [auth, setAuth] = useState(true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        {auth === false &&
            <Routes>
          {routesLogin.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          <Route
            path="*"
            element={<Navigate to={routesLogin[0].to} replace />}
          />
        </Routes>
        }

        {auth && (
          <div className="main-layout">
            <nav>
              <img src={logo} alt="logo" className="logo-layout"/>
              <ul>
                {routesHome.map((route) => (
                  <li key={route.path}>
                    <NavLink
                      to={route.to}
                      className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                      }
                    >
                      {route.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="main">
              <Routes>
                {routesHome.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}

                <Route
                  path="*"
                  element={<Navigate to={routesHome[0].to} replace />}
                />
              </Routes>
            </div>
          </div>
        )}
      </BrowserRouter>
    </Suspense>
  );
};
