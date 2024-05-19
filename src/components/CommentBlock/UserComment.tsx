import { Avatar } from '@nextui-org/react';
import { IComment } from './CommentBlock';
import SVGTrash from '@/assets/trash.svg';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/usersSlice';
import { deleteComment } from '@/http/comments';

interface UserCommentProps {
    comment: IComment;
    handleTrash: (commentId: number) => void;
}

const UserComment = ({ comment, handleTrash }: UserCommentProps) => {
    const user = useSelector(selectUser);

    return (
        <div className="flex gap-2 p-2 rounded hover:bg-zinc-800">
            <div>
                <Avatar
                    src={`${process.env.REACT_APP_API_URL}/${comment.user.img}`}
                />
            </div>
            <div className="flex flex-col justify-between">
                <span className="text-sm font-bold">ScraY</span>
                <span className="text-sm">{comment.comment}</span>
            </div>
            {user.id === comment.user.id &&            
                <div className='flex-1 flex justify-end'>
                    <SVGTrash onClick={() => handleTrash(comment.id)} className='cursor-pointer text-red-600' />
                </div>
            }
        </div>
    );
};

export default UserComment;
