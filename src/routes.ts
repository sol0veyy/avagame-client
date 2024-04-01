import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [

];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: '/:login' + PROFILE_ROUTE,
        Component: Profile
    }
];