export const SELECT_COLOR = 'SELECT_COLOR';

export const selectColor = (color, singlePick, colorId) => ({
  type: SELECT_COLOR,
  color,
  singlePick,
  colorId
});
