import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UserApprovalWindow from './UserApprovalWindow'

const AdminPanel = () => {
    const dispatch = useDispatch();
    const unapprovedUsers = useSelector(store => store.unapprovedUsers);

    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_USERS' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_USERS' });
    }, [unapprovedUsers]);

    return (
        <div className="unapproved-users-div">
        {unapprovedUsers.length > 0 &&
            <>
                <UserApprovalWindow />
            </>
        }
        </div>
    );
};

export default AdminPanel;