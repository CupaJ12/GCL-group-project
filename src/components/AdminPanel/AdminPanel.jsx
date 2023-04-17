import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UserApprovalWindow from './UserApprovalWindow'
import UserStatus from './UserStatus';
import './AdminPanel.css';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const approvedUsers = useSelector(store => store.approvedUsers);
    const unapprovedUsers = useSelector(store => store.unapprovedUsers);
    const [showApprovalWindow, setShowApprovalWindow] = useState(false);
    const [showUsersWindow, setShowUsersWindow] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_USERS' });
        dispatch({ type: 'FETCH_APPROVED_USERS' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_APPROVED_USERS' });
    }, [unapprovedUsers]);

    return (
        <div className="admin-container">
            <p>*Click to expand details</p>
            {unapprovedUsers.length > 0 &&
                <div className="admin-div-content">
                    <section onClick={() => setShowApprovalWindow(!showApprovalWindow)} className="section-header">({unapprovedUsers.length}) Unapproved Users</section>
                    {showApprovalWindow && <UserApprovalWindow />}
                </div>
            }
            {approvedUsers.length > 0 &&
            <div className="admin-div-content">
                <section onClick={() => setShowUsersWindow(!showUsersWindow)} className="section-header">({approvedUsers.length}) Approved Users</section>
                {showUsersWindow && <UserStatus />}
            </div>
            }
        </div>
    );
};

export default AdminPanel;