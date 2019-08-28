import React, { useState, createRef } from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import ColorPicker from '../ColorPicker';
import './TextEditor.scss';

import { addText, clearText } from '../../actions/index';
import BinaryIndexedTree from '../../util/binaryIndexedTree';
import { isIE } from '../../util/userAgent';

let bt;

function applyHighlights(markup, text, start, end, selection, color) {
  if (!text.length) return text;

  const range = bt.getRangeSum(0, start);

  if (!markup) markup = text;

  markup =
    markup.substr(0, range + start) +
    '<mark class="h' +
    color +
    '">' +
    selection +
    '</mark>' +
    markup.substr(range + end);

  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }

  bt.set(start, ('<mark class="h' + color).length + 2); // +2 because of closing tag -> ">
  bt.set(end, '</mark>'.length);

  return markup;
}

const TextEditor = props => {
  const backdrop = createRef();
  const dispatch = useDispatch();

  const [highlights, setHighlights] = useState({ __html: '' });
  const [color, setColor] = useState([]);

  const selectText = e => {
    e.persist();
    if (!color.length) return;

    if (!bt) bt = new BinaryIndexedTree(e.target.value.length + 1);

    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    if (start !== end) {
      const selection = e.target.value.substring(start, end);

      dispatch(addText(color, selection, start));

      setHighlights(state => ({
        __html: applyHighlights(
          state.__html,
          e.target.value,
          start,
          end,
          selection,
          color
        )
      }));
    }
  };

  const onScroll = e => {
    const scrollTop = e.target.scrollTop;
    const scrollLeft = e.target.scrollLeft;

    backdrop.current.scrollTo(scrollLeft, scrollTop);
  };

  const updateContent = e => {
    //If text is updated, we need to creat a new binaryIndexedTree and clear
    //current highlighted text
    bt = undefined;
    dispatch(clearText());
    setHighlights(state => ({ __html: '' }));
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
            onChange={updateContent}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TextEditor;
