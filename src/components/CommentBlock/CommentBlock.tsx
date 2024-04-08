import Modal from "../Modal/Modal"

interface IPropsCommentBlock {
    active: boolean;
}

const CommentBlock = ({active}: IPropsCommentBlock) => {
    return (
        <Modal active={active}>
            <h1>Comment Block</h1>
        </Modal>
    );
};

export default CommentBlock;