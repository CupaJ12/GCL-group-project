import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './AdminPanel.css';
import ConfirmUserDenialModal from '../ConfirmUserDenialModal/ConfirmUserDenialModal';


const UserApprovalWindow = () => { 
    const [approvedUser, setApprovedUser] = useState('');
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const dispatch = useDispatch();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const unapprovedUsers = useSelector(store => store.unapprovedUsers);

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
        <div className="unapproved-user-container">       
                    {unapprovedUsers.map((user, index) => {
                        const registrationDate = new Date(user.registration_date);

                        return (
                            <div className="unapproved-user-div">
                                <p className="user-name">{user.username}</p>
                                <p>
                                    <b>registered on:</b>
                                    <br /> 
                                    {registrationDate.toLocaleDateString('en-US', options)}
                                </p>
                                <button className="approve-btn" onClick={() => {approve(user.id), setApprovedUser(user.username)}}>Approve</button>
                                <button className="deny-btn" onClick={() => setCancelModalVisible(true)}>Deny</button>
                            </div>
                        )
                    })}
        </div>
    )
};

export default UserApprovalWindow;