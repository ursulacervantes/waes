import { createSelector } from 'reselect';

const getColors = (state, props) => {
  return state.color[props.colorId];
};

export default function makeGetColorState() {
  return createSelector(
    [getColors],
    state => state
  );
}
