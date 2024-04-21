import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Subs from "./pages/Subs";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SUBS_ROUTE } from "./utils/consts";

interface IRoutes {
    path: string;
    Component: () => React.JSX.Element;
}

export const authRoutes: IRoutes[] = [];

export const publicRoutes: IRoutes[] = [
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
    },
    {
        path: SUBS_ROUTE,
        Component: Subs
    }
];