import MainPage from "../pages/MainPage.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
]);

function Routers() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routers
