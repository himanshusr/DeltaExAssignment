import {
  GET_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBER,
  CLEAR_MEMBERS,
  MEMBER_ERROR,
} from '../actions/types';

const intitalState = {
  members: [],
  loading: true,
  error: {},
};

const member = function (state = intitalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: payload,
        loading: false,
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, payload],
        loding: false,
      };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member._id !== payload),
        loading: false,
      };
    case MEMBER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_MEMBERS:
      return {
        ...state,
        members: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default member;
