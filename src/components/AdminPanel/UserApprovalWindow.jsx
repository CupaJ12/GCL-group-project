import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './AdminPanel.css';
import CancelValidation from '../CancelValidationModal/CancelValidationModal';

const UserApprovalWindow = () => { 
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
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
                        {user.username} <section className="registration-date">registered on </section>
                        <button className="approve-btn" onClick={() => {approve(user.id), setApprovedUser(user.username)}}>Approve</button>
                        <button className="deny-btn" onClick={() => setCancelModalVisible(true)}>Deny</button>
                        <CancelValidation show={cancelModalVisible} onConfirm={() => deny(user.id)} onDeny={() => setCancelModalVisible(false)} />
                    </div>
                )
            })}
        </>
    )
};

export default UserApprovalWindow;