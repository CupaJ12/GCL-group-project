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
            {/* <div className="unapproved-user-headers">
                <section>Username</section>
                <section>Registered On</section>
            </div> */}

            <table>
                <tbody>
                    {unapprovedUsers.map((user, index) => {
                        return (
                            <tr>
                                <td className="unapproved-user-column">{user.username}</td>
                                <td className="unapproved-user-column">registration date here</td>
                                <td className="unapproved-user-column"><button className="approve-btn" onClick={() => {approve(user.id), setApprovedUser(user.username)}}>Approve</button></td>
                                <td className="unapproved-user-column"><button className="deny-btn" onClick={() => setCancelModalVisible(true)}>Deny</button></td> 
                                <CancelValidation show={cancelModalVisible} onConfirm={() => deny(user.id)} onDeny={() => setCancelModalVisible(false)} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export default UserApprovalWindow;