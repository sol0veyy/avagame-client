import { useState } from "react";
import Close from '@/assets/x.svg';
import Burger from '@/assets/list.svg';
import ProfileButton from "../Button/ProfileButton";
import { Link } from "react-router-dom";
import { MAIN_ROUTE, SUBS_ROUTE } from "@/utils/consts";
import { Button } from "@nextui-org/react";

const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const locate = window.location.pathname;

    return (
        <div className="lg:hidden">
            <Burger onClick={() => setIsOpen(true)} className="mr-2" fill="white" width={30} height={30} />
            <div className={`${!isOpen ? 'hidden' : ''} absolute w-screen h-screen z-20 top-0 left-0`}>
                <div className="transition-width duration-300 ease-in-out absolute w-2/3 h-screen z-20 top-0 right-0 bg-black px-4 pt-2">
                    <Close onClick={() => setIsOpen(false)} className="absolute right-2" fill="white" width={25} height={25} />
                    <div className="mt-8">
                        <ProfileButton navClose={() => setIsOpen(false)} />
                        <div className="flex flex-col gap-2 mt-4">
                            <Link to={MAIN_ROUTE}>
                                <Button color={`${locate === '/' ? 'primary' : null}`} className="w-full" variant="bordered">
                                    Главная
                                </Button>
                            </Link>
                            <Link to={SUBS_ROUTE}>
                                <Button color={`${locate === '/subscriptions' ? 'primary' : null}`} className="w-full" variant="bordered">
                                    Подписки
                                </Button>  
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNavigation;
