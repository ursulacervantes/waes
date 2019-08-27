import { ADD_TEXT, FILTER_TEXT } from '../actions/index';
import { colorList } from '../data/colorList';

const editor = colorList.reduce((state, val) => {
  state[val.color] = {};
  return state;
}, {});

const initialState = {
  editor,
  filter: {}
};

export default function text(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case ADD_TEXT:
      if (state.editor[action.color][action.text]) {
        state.editor[action.color][action.text].push(action.position);
      } else {
        state.editor[action.color][action.text] = [action.position];
      }
      return state;
    case FILTER_TEXT:
      state.filter = action.color.reduce((filteredText, color) => {
        const list = Object.entries(state.editor[color])
          .reduce((text, val) => {
            const newTextList = val[1].reduce((obj, position) => {
              obj.push({ position, text: val[0] });
              return obj;
            }, []);
            return [...text, ...newTextList];
          }, [])
          .sort((a, b) => a.position - b.position);

        if (list.length) filteredText[color] = list;

        return filteredText;
      }, {});
      return state;
    default:
      return state;
  }
}
