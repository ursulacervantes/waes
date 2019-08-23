import React, { useState } from 'react';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import './ColorPicker.scss';

const ColorPicker = props => {
  const [colors, setStatus] = useState([
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
  ]);

  const handleChange = color => {
    setStatus(currentColor => {
      return currentColor.map(val => {
        if (props.singlePick) {
          if (val.color !== color) {
            val.status = '';
          }
        }

        if (val.color === color) {
          val.status = val.status === 'focus' ? '' : 'focus';
        }

        return val;
      });
    });
  };

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <div>
      <ButtonToolbar>
        {colors.map((item, key) => (
          <Button
            type="button"
            key={item.color}
            className={`button ${item.color} ${item.status}`}
            onClick={() => handleChange(item.color)}
            onMouseDown={onMouseDown}
          ></Button>
        ))}
      </ButtonToolbar>
    </div>
  );
};

export default ColorPicker;
