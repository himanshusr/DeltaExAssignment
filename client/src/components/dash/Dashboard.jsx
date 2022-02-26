import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import TableComp from './TableComp';
import ModalForm from './ModalForm';
import { useEffect } from 'react';
import { getMembers } from '../../actions/member';
import DropdownCheckList from './DropdownCheckList';

import Status from './Status';

const Dashboard = ({ isAuthenticated, logout, getMembers, member }) => {
  const modalRef = React.useRef(null);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  const showModal = () => {
    modalRef.current.style.display = 'block';
  };
  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='whole-dashboard'>
      <button
        className=' btn logout-button'
        onClick={(e) => {
          logout();
        }}
      >
        Logout
      </button>
      <div>
        <h1 className='team-member-heading'>Team Members</h1>
        <button className='btn add-team-member-button' onClick={showModal}>
          Add Members{'   '} <i className='fa fa-plus'></i>
        </button>
        <hr />
      </div>
      {/* Dropdown Component */}
      <DropdownCheckList />
      {/* Status */}
      <Status />

      {/* TableComponent */}
      <TableComp />
      {/* Modal form */}
      <ModalForm
        showModal={showModal}
        closeModal={closeModal}
        modalRef={modalRef}
      />
    </div>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  member: state.member,
});

export default connect(mapStateToProps, { logout, getMembers })(Dashboard);
