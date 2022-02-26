import { SET_SORT_BY } from '../actions/types';

const sortBy = (state = 'status', action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SORT_BY:
      return payload;
    default:
      return state;
  }
};

export default sortBy;
