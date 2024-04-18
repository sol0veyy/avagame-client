import Gear from '@/assets/gear.svg';
import ChangeSettings from '@/components/Modal/ChangeSettings';
import { useDisclosure } from '@nextui-org/react';

const Settings = () => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    return (
        <>
            <Gear
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={onOpen}
            />
            <ChangeSettings isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    );
};

export default Settings;
