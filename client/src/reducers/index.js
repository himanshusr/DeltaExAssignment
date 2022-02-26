import { combineReducers } from 'redux';
import auth from './auth';
import member from './member';
import visibilityFilter from './visibilityFilter';
import sortBy from './sortBy';

export default combineReducers({
  auth,
  member,
  visibilityFilter,
  sortBy,
});
