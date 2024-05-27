import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <Provider store={store}>
            <StrictMode>
                <App />
            </StrictMode>
        </Provider>
);