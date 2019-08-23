import React from 'react';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import './ColorPicker.scss';

const colors = ['red', 'yellow', 'green'];

const ColorPicker = props => {
  return (
    <div>
      <ButtonToolbar>
        {colors.map((item, key) => (
          <Button type="button" className={`button ${item}`}></Button>
        ))}
      </ButtonToolbar>
    </div>
  );
};

export default ColorPicker;
