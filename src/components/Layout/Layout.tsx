import Header from '../Header/Header';

interface ILayout {
    children: React.JSX.Element;
}

const Layout = ({ children }: ILayout) => {
    return (
        <div className='min-h-screen'>
            <Header />
            {children}
        </div>
    );
};

export default Layout;