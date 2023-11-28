import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Outlet,
  Router,
  RouterProvider,
} from "react-router-dom"

import Root from "./routes/root"
import Layout from "./routes/Layout"
import { About, AdminDashboard, DashboardWrapper, Home, Login, UserDashboard } from "./containers";
import { UserProvider } from "./contexts/UserContext";
import PetDetails from "./containers/petdetails/PetDetails";
import { AllPets, Visit } from "./containers/dashboard";

// Router

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "about",
        element: <About />
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "dashboard",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <DashboardWrapper />
          },
          {
            path: "all-pets",
            element: <AllPets />
          },
          {
            path: "pet/:petId",
            element: <PetDetails />
          },
          {
            path: "visit",
            element: <Visit />
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
