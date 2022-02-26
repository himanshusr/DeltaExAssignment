import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMember } from '../../actions/member';

const ModalForm = ({ modalRef, closeModal, addMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    status: '',
    notes: '',
  });
  const { name, company, status, notes } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addMember(formData);
    setFormData({
      name: '',
      company: '',
      status: '',
      notes: '',
    });
    closeModal();
  };
  return (
    <div className='modal' ref={modalRef}>
      <form className='modal-content animate form' onSubmit={onSubmit}>
        <span
          onClick={(e) => {
            setFormData({
              name: '',
              company: '',
              status: '',
              notes: '',
            });
            closeModal();
          }}
          className='close'
          title='Close Modal'
        >
          ×
        </span>
        <div className='whole-dashboard'>
          <h1 className='add-team-member-heading'>Add Members</h1>

          <label>
            <b>Name</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              value={name}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Company</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='company'
              value={company}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Status</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='status'
              value={status}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Notes</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='notes'
              value={notes}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='clearfix'>
            <button
              type='button'
              onClick={(e) => {
                setFormData({
                  name: '',
                  company: '',
                  status: '',
                  notes: '',
                });
                closeModal();
              }}
              className='btn cancel-team-member-button'
            >
              Cancel
            </button>
            <button type='submit' className='btn add-team-member-button'>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

ModalForm.propTypes = {};

export default connect(null, { addMember })(ModalForm);
