// Color's Action
export const SELECT_COLOR = 'SELECT_COLOR';

//Text's Action
export const ADD_TEXT = 'ADD_TEXT';

export const selectColor = (color, singlePick, colorId) => ({
  type: SELECT_COLOR,
  color,
  singlePick,
  colorId
});

export const addText = (color, text, position) => ({
  type: ADD_TEXT,
  color,
  text,
  position
});
