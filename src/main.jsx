import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import FriendDetails from './Components/FriendDetails/FriendDetails';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timeline from './Components/Timeline/Timeline';
import Stats from './Components/Stats/Stats';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      {
        path: "/",
        element: <Home />
      },
      {
        path: "/timeline",
        element: <Timeline />
      },
      {
        path: "/stats",
        element: <Stats />
      },
      {
        path: "/friend/:id",
        element: <FriendDetails />
      },
      {
        path: "/timeline/:id",
        element: <Timeline />
      },

    ],
  },
  {
    path: "*",
    element: <ErrorPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={2000} />
  </StrictMode>,
)