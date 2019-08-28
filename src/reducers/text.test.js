import text from './text';
import { ADD_TEXT, CLEAR_TEXT } from '../actions/index';

const state = {
  red: {},
  yellow: {},
  green: {}
};

describe('color reducer', () => {
  it('should return the initial state', () => {
    expect(text(undefined, {})).toEqual(state);
  });

  it('should return same state when no action', () => {
    expect(text(state, undefined)).toEqual({
      red: {},
      yellow: {},
      green: {}
    });
  });

  it('should add text highlighted with red', () => {
    const action = {
      type: ADD_TEXT,
      color: 'red',
      text: 'Catty ipsum need to chase tail spill litter box.',
      position: 10
    };
    expect(text(state, action)).toEqual({
      red: {
        10: 'Catty ipsum need to chase tail spill litter box.'
      },
      yellow: {},
      green: {}
    });
  });

  it('should add text highlighted with yellow', () => {
    const action = {
      type: ADD_TEXT,
      color: 'yellow',
      text: 'slap the dog because cats rule.',
      position: 30
    };
    expect(text(state, action)).toEqual({
      red: {
        10: 'Catty ipsum need to chase tail spill litter box.'
      },
      yellow: {
        30: 'slap the dog because cats rule.'
      },
      green: {}
    });
  });

  it('should clear text and return initial state', () => {
    const action = {
      type: CLEAR_TEXT
    };
    expect(text(state, action)).toEqual({
      red: {},
      yellow: {},
      green: {}
    });
  });
});
