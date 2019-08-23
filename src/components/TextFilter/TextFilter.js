import React from 'react';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';

const TextFilter = props => {
  return (
    <div>
      <ColorPicker></ColorPicker>
      Text Filter Component
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="10" col="30" disabled />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextFilter;
