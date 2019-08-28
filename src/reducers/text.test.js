import text from './text';
import { ADD_TEXT, FILTER_TEXT } from '../actions/index';

const state = {
  editor: {
    red: {},
    yellow: {},
    green: {}
  },
  filter: {}
};

describe('color reducer', () => {
  it('should return the initial state', () => {
    expect(text(undefined, {})).toEqual(state);
  });

  it('should add text highlighted with red', () => {
    const action = {
      type: ADD_TEXT,
      color: 'red',
      text: 'Catty ipsum need to chase tail spill litter box.',
      position: 10
    };
    expect(text(state, action)).toEqual({
      editor: {
        red: {
          'Catty ipsum need to chase tail spill litter box.': [10]
        },
        yellow: {},
        green: {}
      },
      filter: {}
    });
  });

  it('should add deplicated text', () => {
    const action = {
      type: ADD_TEXT,
      color: 'red',
      text: 'Catty ipsum need to chase tail spill litter box.',
      position: 0
    };
    expect(text(state, action)).toEqual({
      editor: {
        red: {
          'Catty ipsum need to chase tail spill litter box.': [10, 0]
        },
        yellow: {},
        green: {}
      },
      filter: {}
    });
  });

  it('should add deplicated text', () => {
    const action = {
      type: ADD_TEXT,
      color: 'yellow',
      text: 'slap the dog because cats rule.',
      position: 30
    };
    expect(text(state, action)).toEqual({
      editor: {
        red: {
          'Catty ipsum need to chase tail spill litter box.': [10, 0]
        },
        yellow: {
          'slap the dog because cats rule.': [30]
        },
        green: {}
      },
      filter: {}
    });
  });

  it('should filter text by red', () => {
    const action = {
      type: FILTER_TEXT,
      color: ['red']
    };
    expect(text(state, action)).toEqual({
      editor: {
        red: {
          'Catty ipsum need to chase tail spill litter box.': [10, 0]
        },
        yellow: {
          'slap the dog because cats rule.': [30]
        },
        green: {}
      },
      filter: {
        red: [
          {
            position: 0,
            text: 'Catty ipsum need to chase tail spill litter box.'
          },
          {
            position: 10,
            text: 'Catty ipsum need to chase tail spill litter box.'
          }
        ]
      }
    });
  });

  it('should filter text by red and yellow', () => {
    const action = {
      type: FILTER_TEXT,
      color: ['red', 'yellow']
    };
    expect(text(state, action)).toEqual({
      editor: {
        red: {
          'Catty ipsum need to chase tail spill litter box.': [10, 0]
        },
        yellow: {
          'slap the dog because cats rule.': [30]
        },
        green: {}
      },
      filter: {
        red: [
          {
            position: 0,
            text: 'Catty ipsum need to chase tail spill litter box.'
          },
          {
            position: 10,
            text: 'Catty ipsum need to chase tail spill litter box.'
          }
        ],
        yellow: [
          {
            position: 30,
            text: 'slap the dog because cats rule.'
          }
        ]
      }
    });
  });
});
