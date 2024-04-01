export interface IAvatar {
    id: number;
    img: string;
    likes: ILike[];
    tags: ITag[];
    userId: number;
    updatedAt: string;
    createdAt: string;
    date: string;
}

interface ILike {
    id: number;
    avatarId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

interface ITag {
    id: number;
    avatarId: number;
    name: string;
    createdAt: string;
}