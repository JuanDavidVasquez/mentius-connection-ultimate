import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { routesHome, routesLogin } from "./routes";
import logo from '../assets/logoBlanco.png'

import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../store/auth/thunk";

export const Navigation = () => {
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();
  const { status, dataUser } = useSelector( state => state.auth );



  useEffect(()=>{

    const token = localStorage.getItem("token");

      if(token){
        dispatch(changeStatus());
        setAuth(true);
      }

   
  },[status]);


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
              <h1 style={{textAlign:'center'}}>{dataUser && dataUser.user_name}</h1>
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
