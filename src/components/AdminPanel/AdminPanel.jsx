import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserApprovalWindow from './UserApprovalWindow'
import UserStatus from './UserStatus';
import './AdminPanel.css';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const approvedUsers = useSelector(store => store.approvedUsers);
    const history = useHistory();
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
            <div className="admin-nav-div">
                {/* <button onClick={() => history.push('/bookingform')} className="nav-med-btn">Add Booking</button>
                <button onClick={() => history.push('/findBooking')} className="nav-med-btn">Find Booking</button> */}
                <p>*click below to expand details and make changes to user accounts</p>
                <br />
                {unapprovedUsers.length > 0 &&
                    <div className="admin-div-content">
                        <section onClick={() => setShowApprovalWindow(!showApprovalWindow)} className="admin-section-header">({unapprovedUsers.length}) Unapproved Users</section>
                        {showApprovalWindow && <UserApprovalWindow />}
                    </div>
                }
                {approvedUsers.length > 0 &&
                <div className="admin-div-content">
                    <section onClick={() => setShowUsersWindow(!showUsersWindow)} className="admin-section-header">({approvedUsers.length}) Approved Users</section>
                    {showUsersWindow && <UserStatus />}
                </div>
                }
                <button onClick={() => history.push('/')} className="nav-med-btn">Home</button>
            </div>
        </div>
    );
};

export default AdminPanel;