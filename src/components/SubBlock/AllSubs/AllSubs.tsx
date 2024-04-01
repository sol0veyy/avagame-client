import React, { useEffect, useState } from 'react';
import UserBlock from '../UserBlock/UserBlock';
import { getAllUserSubs, getAllUserSubsByFilter } from '../../../http/Follower/followerAPI';
import { ISubBlockContent } from '../SubBlock';
import { IUser, selectUser } from '../../../features/users/usersSlice';
import { useSelector } from 'react-redux';

const AllSubs = ({ findText }: ISubBlockContent) => {
    const user = useSelector(selectUser);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (findText === '') {
            getAllUserSubs(user.id).then((users) => {
                setUsers(users);
            });
        } else {
            getAllUserSubsByFilter(findText)
                .then(users => {
                    setUsers(users);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [findText]);

    return (
        <>
            {users.map((user) => (
                <UserBlock key={user.id} otherUser={user} />
            ))}
        </>
    );
};

export default AllSubs;