import { SELECT_COLOR } from '../actions/index';
import { colorList } from '../data/colorList';

const initialState = {
  editor: JSON.parse(JSON.stringify(colorList)),
  filter: JSON.parse(JSON.stringify(colorList))
};

export default function color(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SELECT_COLOR:
      state[action.colorId] = state[action.colorId].map(val => {
        if (action.singlePick) {
          if (val.color !== action.color) {
            val.status = '';
          }
        }

        if (val.color === action.color) {
          val.status = val.status === 'focus' ? '' : 'focus';
        }

        return val;
      });
      return state;
    default:
      return state;
  }
}
