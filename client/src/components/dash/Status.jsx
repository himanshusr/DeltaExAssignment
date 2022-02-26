import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSortByAction } from '../../actions/member';
import { useEffect } from 'react';

const Status = ({ setSortByAction }) => {
  const [sortBy, setSortBy] = useState('status');

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    setSortByAction(sortBy);
  }, [sortBy, setSortByAction]);

  return (
    <div id='list1' className='dropdown-check-list' tabIndex='100'>
      <select name='statusSelection' value={sortBy} onChange={handleChange}>
        <option value='status' className='anchor' disabled>
          Status
        </option>
        <option value='active'>Active</option>
        <option value='closed'>Closed</option>
      </select>
    </div>
  );
};

Status.propTypes = {
  setSortByAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  memberData: state.member.members,
});

export default connect(mapStateToProps, { setSortByAction })(Status);
