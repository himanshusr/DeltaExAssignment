import axios from 'axios';
import {
  GET_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBER,
  MEMBER_ERROR,
  SET_VISIBILITY_FILTER,
  REMOVE_VISIBILITY_FILTER,
  REMOVE_ALL_VISIBILITY_FILTER,
  SET_SORT_BY,
} from './types';

//getMembers
export const getMembers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/members');
    dispatch({
      type: GET_MEMBERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Members

export const deleteMember = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/members/${id}`);

    dispatch({
      type: DELETE_MEMBER,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Member

export const addMember = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/members', formData, config);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Set Visibility Filter(On check)
export const setVisibilityFilter = (company) => async (dispatch) => {
  dispatch({
    type: SET_VISIBILITY_FILTER,
    payload: company,
  });
};

//Remove Visibility Filter(unchecked)
export const removeVisibilityFilter = (company) => async (dispatch) => {
  dispatch({
    type: REMOVE_VISIBILITY_FILTER,
    payload: company,
  });
};

//Remove All Visibility
export const removeAllVisibilityFilter = () => async (dispatch) => {
  dispatch({
    type: REMOVE_ALL_VISIBILITY_FILTER,
  });
};

//Set sort by status

export const setSortByAction = (statusValue) => async (dispatch) => {
  dispatch({
    type: SET_SORT_BY,
    payload: statusValue,
  });
};
