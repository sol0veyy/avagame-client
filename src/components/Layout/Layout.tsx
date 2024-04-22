import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface ILayout {
    children: React.JSX.Element;
}

const Layout = ({ children }: ILayout) => {
    return (
        <div className='h-screen grid grid-rows-12 grid-cols-1'>
            <Header />
            <div className='p-4 row-span-10 lg:row-span-11 overflow-auto lg:overflow-hidden'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;