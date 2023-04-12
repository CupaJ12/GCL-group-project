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
        <>
            {/* <div className="unapproved-user-headers">
                <section>Username</section>
                <section>Registered On</section>
            </div> */}

            <table>
                <tbody>
                    {unapprovedUsers.map((user, index) => {
                        const registrationDate = new Date(user.registration_date);

                        return (
                            <tr>
                                <td className="unapproved-username-column">{user.username}</td>
                                <td className="unapproved-user-column">registered on: <br /> {registrationDate.toLocaleDateString('en-US', options)}</td>
                                <td className="unapproved-user-column"><button className="approve-btn" onClick={() => {approve(user.id), setApprovedUser(user.username)}}>Approve</button></td>
                                <td className="unapproved-user-column"><button className="deny-btn" onClick={() => setCancelModalVisible(true)}>Deny</button></td> 
                                <ConfirmUserDenialModal show={cancelModalVisible} onConfirm={() => deny(user.id)} onDeny={() => setCancelModalVisible(false)} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export default UserApprovalWindow;