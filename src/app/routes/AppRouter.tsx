import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/users/usersSlice";
import { MAIN_ROUTE } from "@/shared/utils/consts";
import { authRoutes, publicRoutes } from "./routes";
import { Suspense } from "react";
import { Loader } from "@/shared/ui/Loader/Loader";

export const AppRouter = () => {
    const user = useSelector(selectUser);
    
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>} />
            </Routes>
        </Suspense>
    );
};