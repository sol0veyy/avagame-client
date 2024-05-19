import { $authHost, $host } from '..'

export const getAllComments = async (avatarId: number) => {
    const { data } = await $host.get(`comment/${avatarId}`);

    return data.comments;
}

export const createComment = async (comment: string, avatarId: number) => {
    const { data } = await $authHost.post('comment/', { comment, avatarId });

    return data.comment;
}

export const deleteComment = async (commentId: number) => {
    const { data } = await $authHost.delete(`comment/${commentId}`);

    return data.message;
}