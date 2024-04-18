import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from './features/users/usersSlice';
import './styles/variables.scss';
import Layout from './components/Layout/Layout';
import { NextUIProvider } from '@nextui-org/react';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data: IUser) => {
                dispatch(setUser(data));
            })
            .catch(() => setLoading(false))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {!loading && (
                <BrowserRouter>
                    <NextUIProvider>
                        <Layout>
                            <AppRouter />
                        </Layout>
                    </NextUIProvider>
                </BrowserRouter>
            )}
        </>
    );
};

export default App;
