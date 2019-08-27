import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';

import { filterText } from '../../actions/index';

const TextFilter = props => {
  const [text, setText] = useState('');
  let filteredText = useSelector(state => state.text);

  const dispatch = useDispatch();

  const filterByColor = color => {
    dispatch(filterText(color));

    setText(() => {
      return Object.entries(filteredText.filter).reduce((obj, val) => {
        const t = val[1].reduce((s, v) => {
          s += v.text;
          return s + '\r\n';
        }, '');

        return t + '\r\n';
      }, '');
    });
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
          <Form.Control
            as="textarea"
            rows="10"
            col="30"
            disabled
            value={text}
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextFilter;
