import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DenyUserModal from './DenyUserModal';

const UserStatus = () => {
    const approvedUsers = useSelector(store => store.approvedUsers);
    const [deletedUser, setDeletedUser] = useState({});
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const dispatch = useDispatch();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_APPROVED_USERS' });
    }, []);

    const handleClick = (currentAdminStatus, userId) => {
        const userStatus = {
            adminStatus: !currentAdminStatus,
            userId,
        }
        dispatch({ type: 'SET_USER_ADMIN_STATUS', payload: userStatus });
    };

    const deleteUser = (userid) => {
        dispatch({ type: 'DELETE_USER', payload: userid });
    };

    return (
        <div className="unapproved-user-container">
            <DenyUserModal onConfirm={() => {deleteUser(deletedUser.id); setDeleteModalVisible(false)}} onDeny={() => setDeleteModalVisible(false)} show={deleteModalVisible}/>
            {approvedUsers.map((appUser, index) => {
                const registrationDate = new Date(appUser.registration_date);

                if (user.id === appUser.id) {
                    return (
                        <div className="approved-self-div">
                    
                            <p className="user-name">{appUser.username}</p>
                            <p>
                                <b>registered on:</b> 
                                <br /> 
                                {registrationDate.toLocaleDateString('en-US', options)}
                            </p>
                        </div>
                    )
                }
                return (
                    <div className="approved-user-div">
                        <p className="user-name">{appUser.username}</p>
                        <p>
                            <b>registered on:</b> 
                            <br />
                            <p>{registrationDate.toLocaleDateString('en-US', options)}</p>
                            <button className={appUser.admin ? "delete-btn" : "approve-btn"} onClick={() => {handleClick(appUser.admin, appUser.id)}}>{appUser.admin ? 'Remove Admin' : 'Make Admin'}</button>
                            <button className="delete-btn" onClick={() => {setDeleteModalVisible(true); setDeletedUser(appUser)}}>Delete User</button>
                        </p>
                    </div>
                )
            })}
        </div>
    )

};

export default UserStatus;