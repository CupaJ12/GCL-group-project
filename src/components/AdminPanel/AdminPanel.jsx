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
                <div className="nav-btns">
                    <button onClick={() => history.push('/')} className="back-btn">Home</button>
                </div>
                <p>*click below to expand details and make changes to user accounts</p>
                <br />
                {unapprovedUsers.length > 0 &&
                    <div className="admin-div-content">
                        <section onClick={() => setShowApprovalWindow(!showApprovalWindow)} className="admin-section-header">
                            <section className="expand-details">
                                {showApprovalWindow ? '-' : '+'}
                            </section>

                            <section className="details-header">
                                ({unapprovedUsers.length}) Unapproved Users
                            </section>
                        </section>
                        {showApprovalWindow && <UserApprovalWindow />}
                    </div>
                }

                {approvedUsers.length > 0 &&
                    <div className="admin-div-content">
                        <section onClick={() => setShowUsersWindow(!showUsersWindow)} className="admin-section-header">
                            <section className="expand-details">
                                {showUsersWindow ? '-' : '+'}
                            </section>

                            <section className="details-header">
                                ({approvedUsers.length}) Approved Users
                            </section>
                        </section>
                        {showUsersWindow && <UserStatus />}
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminPanel;