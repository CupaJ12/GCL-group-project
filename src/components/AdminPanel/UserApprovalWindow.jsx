import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const UserApprovalWindow = () => { 
    const dispatch = useDispatch();
    const unapprovedUsers = useSelector(store => store.unapprovedUsers);
    const [approvedUser, setApprovedUser] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_USERS' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_USERS' });
    }, [approvedUser]);

    const approve = (userid) => {
        dispatch({ type: 'SET_USER_APPROVED', payload: userid });
    };

    const deny = (userid) => {
        dispatch({ type: 'DELETE_USER', payload: userid });
    };

    return (
        <>
            {unapprovedUsers.map((user, index) => {
                return (
                    <div className="unapproved-user">
                        {user.username}
                        <button classname="approve-btn" onClick={() => {approve(user.id), setApprovedUser(user.username)}}>Approve</button>
                        <button classname="deny-btn" onClick={() => deny(user.id)}>Deny</button>
                    </div>
                )
            })}
        </>
    )
};

export default UserApprovalWindow;