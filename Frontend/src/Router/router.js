import React from "react"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "../Modules/Login/Login"
import Home from "../Modules/Home/Home"
function Router() {
    const router_url = createBrowserRouter([
        {
            element: (
                <>
                    <Outlet />
                </>
            ),
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/",
                    element: <Home />
                }
            ]
        }
    ])
    return (
        <RouterProvider router={router_url} />
    );
}
export default Router