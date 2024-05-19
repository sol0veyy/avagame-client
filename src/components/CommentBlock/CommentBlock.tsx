import { Button, Card, CardBody, CardFooter, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { IAvatar } from "../../features/avatars/interface";
import UserComment from './UserComment';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createComment, deleteComment, getAllComments } from '@/http/comments';
import { IUser } from '@/features/users/usersSlice';
import SendIcon from '@/assets/send.svg'; 
import UserAvatar from '../UserAvatar/UserAvatar';

interface IPropsCommentBlock {
    isOpen: boolean;
    onOpenChange: () => void;
    avatar: IAvatar;
}

export interface IComment {
    id: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    avatarId: number;
    user: IUser;
}

const CommentBlock = ({isOpen, onOpenChange, avatar}: IPropsCommentBlock) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState('');
    const refCommentBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllComments(avatar.id)
            .then((comments) => {
                setComments(comments);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [isOpen])

    useEffect(() => {
        if (refCommentBlock.current && isOpen) {
            refCommentBlock.current.parentElement.scrollTop = refCommentBlock.current.parentElement.scrollHeight;
        }
    }, [isOpen, comments])

    const addComment = () => {
        createComment(comment, avatar.id)
            .then((comment: IComment) => {
                setComments(prev => [...prev, comment]);
                setComment('');
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleTrash = (commentId: number) => {
        deleteComment(commentId)
            .then((message) => {
                const newCommentsList = comments.filter((comment) => comment.id !== commentId);
                setComments(newCommentsList);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <Modal className='h-full lg:h-auto' size='2xl' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Комментарии</ModalHeader>
                <ModalBody className='mb-4'>    
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='lg:basis-1/3 flex flex-col gap-4'>
                            <img className='self-center' src={`${process.env.REACT_APP_API_URL}/${avatar.img}`} width={250} height={250} />
                            <UserAvatar user={avatar.user} />
                        </div>
                        <Card className='lg:basis-2/3'>
                            <CardBody>
                                <div ref={refCommentBlock} className='h-40 flex flex-col'>
                                    {comments.map((comment) => (
                                        <UserComment key={comment.id} comment={comment} handleTrash={handleTrash} />
                                    ))}
                                </div>
                            </CardBody>
                            <CardFooter className='flex gap-2'>
                                <Input onChange={(e) => setComment(e.target.value)} value={comment} />
                                <Button onClick={addComment} isIconOnly variant='bordered'>
                                    <SendIcon width={20} height={20} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CommentBlock;
