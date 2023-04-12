import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UserApprovalWindow from './UserApprovalWindow'
import './AdminPanel.css';

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
        <div className="unapproved-users-container">
            {unapprovedUsers.length > 0 &&
            <>
                <section className="section-header">Unapproved Users</section>
                <UserApprovalWindow />
            </>
            }
        </div>
    );
};

export default AdminPanel;