import React from 'react';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';

const TextEditor = props => {
  return (
    <div>
      <ColorPicker singlePick={true}></ColorPicker>
      Text Editor Component
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="10" col="30" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextEditor;
