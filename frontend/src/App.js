import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import GroupRegistrationDetailsView from "./components/GroupRegistrationDetailsView";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration />,
    },
    {
      path: "/dashboard/:id",
      element: <Dashboard />,
    },
    {
      path: "/groupDetails/:id",
      element: <GroupRegistrationDetailsView />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
    
  );
}

export default App;
