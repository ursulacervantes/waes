import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import ColorPicker from '../../ColorPicker';
import renderer from 'react-test-renderer';
import { initialState } from '../../../mock/storeMock';

let state = initialState;
const mockStore = configureMockStore();
const store = mockStore(() => state);

function setColor(color) {}

describe('Color Picker', () => {
  it('select only one color', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ColorPicker
          singlePick={true}
          colorId="editor"
          setColor={setColor}
        ></ColorPicker>
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger red color button
    tree.children[0].children[0].props.onClick();
    state.color.editor = [
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
    ];
    store.dispatch({ type: 'SELECT_COLOR' });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger yellow color button
    tree.children[0].children[1].props.onClick();
    state.color.editor = [
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
    ];
    store.dispatch({ type: 'SELECT_COLOR' });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('select multiple colors', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ColorPicker
          singlePick={false}
          colorId="filter"
          setColor={setColor}
        ></ColorPicker>
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger red color button
    tree.children[0].children[0].props.onClick();
    state.color.filter = [
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
    ];
    store.dispatch({ type: 'SELECT_COLOR' });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger yellow color button
    tree.children[0].children[1].props.onClick();
    state.color.filter = [
      {
        color: 'red',
        status: 'focus'
      },
      {
        color: 'yellow',
        status: 'focus'
      },
      {
        color: 'green',
        status: ''
      }
    ];
    store.dispatch({ type: 'SELECT_COLOR' });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
