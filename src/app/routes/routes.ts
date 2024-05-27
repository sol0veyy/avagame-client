import { AuthPage } from "@/pages/Auth";
import Profile from "../../pages/Profile";
import Subs from "../../pages/Subs";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SUBS_ROUTE } from "../../shared/utils/consts";
import React from "react";
import { HomePage } from "@/pages/Home";

interface IRoutes {
    path: string;
    Component: (() => React.JSX.Element) | React.LazyExoticComponent<() => JSX.Element>;
}

export const authRoutes: IRoutes[] = [];

export const publicRoutes: IRoutes[] = [
    {
        path: MAIN_ROUTE,
        Component: HomePage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
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