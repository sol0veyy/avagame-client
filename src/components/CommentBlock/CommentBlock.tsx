import { Button, Card, CardBody } from "@nextui-org/react";
import { IAvatar } from "../../features/avatars/interface";
import Modal from "../Modal/Modal"

interface IPropsCommentBlock {
    active: boolean;
    setActiveCommentBlock: React.Dispatch<React.SetStateAction<boolean>>;
    avatar: IAvatar;
}

const CommentBlock = ({active, setActiveCommentBlock, avatar}: IPropsCommentBlock) => {
    return (
        <Modal active={active}>
            {/* <img src={`${process.env.REACT_APP_API_URL}/${avatar.img}`} width={250} height={250} /> */}
            <Card>
                <CardBody>
                    <div className="flex gap-2 items-center">
                        <p className="m-0">Совсем скоро!</p>
                        <Button size="sm" color="success" onClick={() => setActiveCommentBlock(false)}>окей</Button>
                    </div>
                </CardBody>
            </Card>
        </Modal>
    );
};

export default CommentBlock;