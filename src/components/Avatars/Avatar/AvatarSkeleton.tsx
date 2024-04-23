import { Card, Skeleton } from '@nextui-org/react';

const AvatarSkeleton = () => {
    return (
        <Card className="w-[150px] space-y-3 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
        </Card>
    );
};

export default AvatarSkeleton;
