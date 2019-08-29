import { ADD_TEXT, CLEAR_TEXT } from '../actions/index';
import { colorList } from '../data/colorList';

const initialState = colorList.reduce((state, val) => {
  state[val.color] = {};
  return state;
}, {});

export default function text(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case ADD_TEXT:
      state[action.color][action.position] = action.text;
      return state;
    case CLEAR_TEXT:
      state = colorList.reduce((state, val) => {
        state[val.color] = {};
        return state;
      }, {});
      return state;
    default:
      return state;
  }
}
