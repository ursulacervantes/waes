import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';

import { filterText } from '../../actions/index';
import './TextFilter.scss';

const TextFilter = props => {
  const [text, setText] = useState({ __html: '' });
  let filteredText = useSelector(state => state.text);

  const dispatch = useDispatch();

  const filterByColor = color => {
    dispatch(filterText(color));

    const list = Object.entries(filteredText.filter).reduce((obj, val) => {
      const [color, textList] = [val[0], val[1]];
      const t = textList.reduce((s, v) => {
        s += '<mark class="filter h' + color + '">' + v.text + '</mark>';
        return s + '<br/>';
      }, '');

      return obj + t + '<br/>';
    }, '');

    setText(() => ({ __html: list }));
  };

  return (
    <div>
      <ColorPicker
        singlePick={false}
        colorId="filter"
        setColor={filterByColor}
      ></ColorPicker>

      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <div className="filteredText" dangerouslySetInnerHTML={text}></div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextFilter;
