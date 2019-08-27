import React from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';

import { addText } from '../../actions/index';

const TextEditor = props => {
  const dispatch = useDispatch();

  const highlightColor = color => {};

  const selectText = e => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    if (start !== end) {
      const selection = e.target.value.substring(start, end);
      console.log(selection);
      dispatch(addText('red', selection, start));
    }
  };

  return (
    <div>
      <ColorPicker
        singlePick={true}
        colorId="editor"
        setColor={highlightColor}
      ></ColorPicker>

      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows="10"
            col="30"
            className="editorTextarea"
            onSelect={e => selectText(e)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextEditor;
