import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface ILayout {
    children: React.JSX.Element;
}

const Layout = ({ children }: ILayout) => {
    return (
        <div className='min-h-screen'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;