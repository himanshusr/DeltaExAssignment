import React from 'react';

import { deleteMember } from '../../actions/member';
import { connect } from 'react-redux';

const TableComp = ({ memberData, deleteMember }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {memberData.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.company}</td>
              <td>{member.status}</td>
              <td>{new Date(member.date).toLocaleDateString('en-GB')}</td>
              <td>{member.notes}</td>
              <td>
                <button
                  type='button'
                  className='delete-icon'
                  onClick={(e) => deleteMember(member._id)}
                >
                  {' '}
                  <i className='fa fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getFilterData = (data, filter, sortBy) => {
  let memberData = [];
  if (filter.length === 0) {
    memberData = data;
  } else {
    memberData = data.filter((value) => filter.includes(value.company));
  }

  if (sortBy === 'active') {
    memberData.sort(function (a, b) {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy === 'closed') {
    memberData.sort(function (a, b) {
      if (a.status < b.status) {
        return 1;
      }
      if (a.status > b.status) {
        return -1;
      }
      return 0;
    });
  }

  return memberData;
};

const mapStateToProps = (state) => ({
  memberData: getFilterData(
    state.member.members,
    state.visibilityFilter.visibilityFilter,
    state.sortBy
  ),
  sortBy: state.sortBy,
});

export default connect(mapStateToProps, { deleteMember })(TableComp);
