import React, { useState, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';
import './TextEditor.scss';

import { addText } from '../../actions/index';

const ua = window.navigator.userAgent.toLowerCase();
const isIE = !!ua.match(/msie|trident\/7|edge/);

function applyHighlights(text, start, end, selection, color) {
  text =
    text.substr(0, start) +
    '<mark class="h' +
    color +
    '">' +
    selection +
    '</mark>' +
    text.substr(end);

  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }
  return text;
}

const TextEditor = props => {
  const backdrop = createRef();
  const dispatch = useDispatch();

  // let editorText = useSelector(state => state.text);
  const [highlights, setHighlights] = useState({ __html: '' });
  const [color, setColor] = useState([]);

  const selectText = e => {
    e.persist();
    if (!color.length) return;

    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    if (start !== end) {
      const selection = e.target.value.substring(start, end);

      dispatch(addText(color, selection, start));

      setHighlights(state => ({
        __html: applyHighlights(e.target.value, start, end, selection, color)
      }));
    }
  };

  const onScroll = e => {
    const scrollTop = e.target.scrollTop;
    const scrollLeft = e.target.scrollLeft;

    backdrop.current.scrollTo(scrollLeft, scrollTop);
  };

  return (
    <div className="editorContainer">
      <ColorPicker
        singlePick={true}
        colorId="editor"
        setColor={setColor}
      ></ColorPicker>

      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <div className="backdrop" ref={backdrop}>
            <div
              className="highlights"
              dangerouslySetInnerHTML={highlights}
            ></div>
          </div>
          <Form.Control
            as="textarea"
            rows="10"
            col="30"
            className="editorTextarea"
            onSelect={e => selectText(e)}
            onScroll={onScroll}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextEditor;
