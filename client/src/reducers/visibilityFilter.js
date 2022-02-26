import {
  SET_VISIBILITY_FILTER,
  REMOVE_VISIBILITY_FILTER,
  REMOVE_ALL_VISIBILITY_FILTER,
} from '../actions/types';

const initialState = {
  visibilityFilter: [],
};

const visibilityFilter = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: [...state.visibilityFilter, payload],
      };
    case REMOVE_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: state.visibilityFilter.filter(
          (element) => element !== payload
        ),
      };
    case REMOVE_ALL_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: [],
      };

    default:
      return state;
  }
};

export default visibilityFilter;
