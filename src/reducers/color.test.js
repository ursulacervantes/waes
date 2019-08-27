import color from './color';
import { SELECT_COLOR } from '../actions/index';

const initialState = {
  editor: [
    {
      color: 'red',
      status: ''
    },
    {
      color: 'yellow',
      status: ''
    },
    {
      color: 'green',
      status: ''
    }
  ],
  filter: [
    {
      color: 'red',
      status: ''
    },
    {
      color: 'yellow',
      status: ''
    },
    {
      color: 'green',
      status: ''
    }
  ]
};

describe('color reducer', () => {
  it('should return the initial state', () => {
    expect(color(undefined, {})).toEqual(initialState);
  });

  it('should select one color when singlePick is true', () => {
    const action = {
      type: SELECT_COLOR,
      color: 'green',
      singlePick: true,
      colorId: 'editor'
    };
    expect(color(initialState, action)).toEqual({
      editor: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: 'focus'
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: ''
        }
      ]
    });
  });

  it('should select multiple colors when singlePick is false', () => {
    const firstAction = {
      type: SELECT_COLOR,
      color: 'yellow',
      singlePick: false,
      colorId: 'filter'
    };
    const secondAction = {
      type: SELECT_COLOR,
      color: 'green',
      singlePick: false,
      colorId: 'filter'
    };
    expect(color(initialState, firstAction)).toEqual({
      editor: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: 'focus'
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: 'focus'
        },
        {
          color: 'green',
          status: ''
        }
      ]
    });

    expect(color(initialState, secondAction)).toEqual({
      editor: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: 'focus'
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: 'focus'
        },
        {
          color: 'green',
          status: 'focus'
        }
      ]
    });
  });

  it('should deselect a color when singlePick is false', () => {
    const action = {
      type: SELECT_COLOR,
      color: 'green',
      singlePick: false,
      colorId: 'filter'
    };
    expect(color(initialState, action)).toEqual({
      editor: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: 'focus'
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: 'focus'
        },
        {
          color: 'green',
          status: ''
        }
      ]
    });
  });

  it('should select only one color when singlePick is true', () => {
    const action = {
      type: SELECT_COLOR,
      color: 'red',
      singlePick: true,
      colorId: 'editor'
    };
    expect(color(initialState, action)).toEqual({
      editor: [
        {
          color: 'red',
          status: 'focus'
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: ''
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: 'focus'
        },
        {
          color: 'green',
          status: ''
        }
      ]
    });
  });

  it('should deselect a color when singlePick is true', () => {
    const action = {
      type: SELECT_COLOR,
      color: 'red',
      singlePick: true,
      colorId: 'editor'
    };
    expect(color(initialState, action)).toEqual({
      editor: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: ''
        },
        {
          color: 'green',
          status: ''
        }
      ],
      filter: [
        {
          color: 'red',
          status: ''
        },
        {
          color: 'yellow',
          status: 'focus'
        },
        {
          color: 'green',
          status: ''
        }
      ]
    });
  });
});
