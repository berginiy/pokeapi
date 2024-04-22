import MainPage from "../pages/MainPage.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PokemonPage from "../pages/PokemonPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/pokemon/:idpokemon",
        element: <PokemonPage />
    }
]);

function Routers() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routers
