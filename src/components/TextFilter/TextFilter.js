import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';
import { store } from '../../store';

import './TextFilter.scss';

const TextFilter = props => {
  const [colorList, setColorList] = useState([]);

  const filter = text => {
    return Object.entries(text).reduce((obj, val) => {
      const [color, textList] = [val[0], val[1]];

      if (!colorList.includes(color)) return obj;

      const t = Object.entries(textList).reduce((s, v) => {
        s += '<mark class="filter h' + color + '">' + v[1] + '</mark>';
        return s + '<br/>';
      }, '');

      return obj + t + '<br/>';
    }, '');
  };

  const filterByColor = text => {
    if (!colorList.length) return { __html: '' };

    return { __html: filter(text) };
  };

  let filteredText = useSelector(state => filterByColor(state.text));

  const updateFilter = color => {
    setColorList(color);
    filterByColor(store.getState().text);
  };

  return (
    <div>
      <ColorPicker
        singlePick={false}
        colorId="filter"
        setColor={updateFilter}
      ></ColorPicker>

      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <div
            className="filteredText"
            dangerouslySetInnerHTML={filteredText}
          ></div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextFilter;
