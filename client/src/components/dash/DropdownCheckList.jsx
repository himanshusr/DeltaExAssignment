import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  setVisibilityFilter,
  removeVisibilityFilter,
  removeAllVisibilityFilter,
} from '../../actions/member';

import { connect } from 'react-redux';

const DropdownCheckList = ({
  member,
  setVisibilityFilter,
  removeVisibilityFilter,
  removeAllVisibilityFilter,
  visibilityFilter,
}) => {
  const listRef = useRef(null);
  const [companyList, setCompanyList] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);

  //checking unique company values
  useEffect(() => {
    const mixCompanies = member.members.map((obj) => obj.company);
    const uniqueCompanies = [...new Set(mixCompanies)];
    const arr = [];
    for (var i = 0; i < uniqueCompanies.length; i++) {
      arr.push({
        company: uniqueCompanies[i],
        isChecked: false,
      });
    }
    setCompanyList(arr);
    removeAllVisibilityFilter();
  }, [member]);

  //Setting the company count
  useEffect(() => {
    setCompanyCount(visibilityFilter.length);
  }, [visibilityFilter]);

  //Logic for the dropdown
  if (listRef.current !== null) {
    listRef.current.getElementsByClassName('anchor')[0].onclick = function (
      evt
    ) {
      if (listRef.current.classList.contains('visible'))
        listRef.current.classList.remove('visible');
      else listRef.current.classList.add('visible');
    };
  }

  //Check uncheck change
  const handleChange = (e) => {
    const { name, checked } = e.target;

    //Select All Logic
    if (name === 'allSelect') {
      let tempCompany = companyList.map((company) => {
        return { ...company, isChecked: checked };
      });
      setCompanyList(tempCompany);

      //Clear All Visibility
      removeAllVisibilityFilter();
      if (e.target.checked) {
        //Add Visibility of every Company
        companyList.forEach((company) => {
          setVisibilityFilter(company.company);
        });
      }
    } else {
      //Select all logic
      let tempCompany = companyList.map((company) =>
        company.company === name ? { ...company, isChecked: checked } : company
      );
      setCompanyList(tempCompany);
      //Set visibility and remove visibility
      if (e.target.checked) {
        setVisibilityFilter(name);
      } else {
        removeVisibilityFilter(name);
      }
    }
  };

  return (
    <div
      id='list1'
      ref={listRef}
      className='dropdown-check-list'
      tabIndex='100'
    >
      <span className='anchor'>Company ({companyCount})</span>
      <ul className='items'>
        <li key={1000}>
          <input
            type='checkbox'
            name='allSelect'
            checked={
              companyList.filter((company) => company?.isChecked !== true)
                .length < 1
            }
            onChange={handleChange}
          />
          Select All
        </li>
        {companyList.map((company, idx) => (
          <li key={idx}>
            <input
              type='checkbox'
              name={company.company}
              checked={company?.isChecked || false}
              onChange={handleChange}
            />
            {company.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownCheckList.propTypes = {
  member: PropTypes.object.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  removeVisibilityFilter: PropTypes.func.isRequired,
  removeAllVisibilityFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  member: state.member,
  visibilityFilter: state.visibilityFilter.visibilityFilter,
});

export default connect(mapStateToProps, {
  setVisibilityFilter,
  removeVisibilityFilter,
  removeAllVisibilityFilter,
})(DropdownCheckList);
