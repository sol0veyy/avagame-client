import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { check } from './http/userAPI';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from './features/users/usersSlice';
import Layout from './components/Layout/Layout';
import { NextUIProvider } from '@nextui-org/react';
import { AppRouter } from './app/routes';
import './styles/variables.scss';
import './styles/globals.css';

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
