import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import './ColorPicker.scss';
import { selectColor } from '../../actions/index';

const ColorPicker = props => {
  const colorList = useSelector(state => state.color[props.colorId]);
  const dispatch = useDispatch();

  const handleChange = color => {
    dispatch(selectColor(color, props.singlePick, props.colorId));

    //Return list of selected colors to parent component
    props.setColor(
      colorList.reduce((list, e) => {
        if (e.status === 'focus') list.push(e.color);
        return list;
      }, [])
    );
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <div>
      <ButtonToolbar>
        {colorList.map((item, key) => (
          <Button
            type="button"
            key={item.color}
            className={`button ${item.color} ${item.status}`}
            onClick={() => handleChange(item.color)}
            onMouseDown={handleMouseDown}
          ></Button>
        ))}
      </ButtonToolbar>
    </div>
  );
};

export default ColorPicker;
