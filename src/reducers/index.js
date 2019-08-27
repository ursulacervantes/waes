import { combineReducers } from 'redux';
import color from './color';
import text from './text';

export default combineReducers({
  color,
  text
});
