import { Suspense, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { routesHome, routesLogin } from "./routes";

export const Navigation = () => {
  const [auth, setAuth] = useState(false);

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
              <img src="logo.png" alt="logo" />
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
          </div>
        )}
      </BrowserRouter>
    </Suspense>
  );
};
